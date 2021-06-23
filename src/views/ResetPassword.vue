<template> 
    <v-app id="inspire">
      <v-main>
         <v-container fluid>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="teal lighten-2">
                        <v-toolbar-title>Reset Password</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form v-if="!sendEmail">
                           <v-text-field
                              prepend-icon="email"
                              name="Email"
                              label="Email"
                              type="text"
                              v-model="resetPassword.email"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>

                     <v-card-actions v-if="!sendEmail">
                        <v-spacer></v-spacer>
                         <v-btn class="" color="teal lighten-2" @click="iniReset()">
                         <v-progress-circular v-if="loadingLogin"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                            Send email
                         </v-btn>
                     </v-card-actions>

                     <v-card-text>
                        <v-form v-if="sendEmail">
                           <v-text-field
                              prepend-icon="email"
                              name="Email"
                              label="Email"
                              type="text"
                              v-model="formToReset.email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="newpassword"
                              label="New Password"
                              type="password"
                              v-model="formToReset.password"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="confirmedpassword"
                              label="Confirm Password"
                              type="password"
                              v-model="formToReset.passwordConfirmed"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="secretQuestion"
                              label="Secret Question"
                              type="text"
                              v-model="formToReset.secretQuestion"
                              disabled="true"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="secretAnswer"
                              label="Secret Answer"
                              type="text"
                              v-model="formToReset.secretAnswer"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>

                     <v-card-actions v-if="sendEmail">
                        <v-spacer></v-spacer>
                         <v-btn class="" color="teal lighten-2" @click="resetPass()">
                         <v-progress-circular v-if="loadingLogin"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                            Send new password
                         </v-btn>
                     </v-card-actions>



                     <div class="my-3 mx-3 px-3 py-3" align-center justify-center>
                        <label>You do not have an account? </label>
                        <label><router-link to="/sign-up">Sign up here</router-link></label>
                     </div>

                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
      <v-snackbar
         v-model="sucessSnackBar.snackbar"
         :timeout="sucessSnackBar.timeout"
         absolute
         left
         top
         color="success"
         outlined
      >{{ sucessSnackBar.text }}
      
         <template v-slot:action="{ attrs }">
            <v-btn
               color="blue"
               text
               v-bind="attrs"
               @click="sucessSnackBar.snackbar = false"
            >
               Close
            </v-btn>
         </template>
      </v-snackbar>
      <v-snackbar
         v-model="errorSnackBar.snackbar"
         :timeout="errorSnackBar.timeout"
         absolute
         left
         top
         color="error"
         outlined
      >{{ errorSnackBar.text }}
      
         <template v-slot:action="{ attrs }">
            <v-btn
               color="blue"
               text
               v-bind="attrs"
               @click="errorSnackBar.snackbar = false"
            >
               Close
            </v-btn>
         </template>
      </v-snackbar>
      <v-snackbar
         v-model="errorSnackBarPassMatch.snackbar"
         :timeout="errorSnackBarPassMatch.timeout"
         absolute
         left
         top
         color="success"
         outlined
      >{{ errorSnackBarPassMatch.text }}
      
         <template v-slot:action="{ attrs }">
            <v-btn
               color="blue"
               text
               v-bind="attrs"
               @click="errorSnackBarPassMatch.snackbar = false"
            >
               Close
            </v-btn>
         </template>
      </v-snackbar>
   </v-app>
</template>

<script>
import axios from 'axios';
import {BASE_URL} from '../variables/variables.js'

export default {
    name: "ResetPassword",
    data:()=>({
      resetPassword: {
          email: '',
        //   password: ''
      },
      loadingLogin: false,
      sendEmail: false,
      formToReset: {
          email: '',
          password: '',
          secretQuestion: '',
          secretAnswer: '',
          passwordConfirmed: '',
      },
      sucessSnackBar : {
         snackbar: false,
         text: 'Login successful!!',
         timeout: 2000
      },
      errorSnackBar : {
         snackbar: false,
         text: 'Login Error!!',
         timeout: 2000
      },
      errorSnackBarPassMatch : {
         snackbar: false,
         text: 'Password doesnt match!!',
         timeout: 2000
      }
      ,
    }),
    methods:{
        iniReset(){
            const initReset = {
                email: this.resetPassword.email,
                // password: this.resetPassword.password
            }
            this.loadingLogin = true;
            axios.get(`${BASE_URL}/resetpassword/innitreset/${initReset.email}`)
            .then((response) =>{
               console.log(response.data);
               this.formToReset.email = initReset.email;
               this.formToReset.secretQuestion = response.data.secretQuestion;

                this.sendEmail = true;
            //    const { token, user } = response.data;
               this.loadingLogin = false;
            //    localStorage.setItem('user-cyber-vue', JSON.stringify(user));
            //    localStorage.setItem('token-cyber-vue', token);
            //    this.trackLogin();
            //    this.sucessSnackBar.snackbar = true;
            //    setTimeout(()=>{this.$router.push('/');},1000);
            })
            .catch(() => {
               this.errorSnackBar.snackbar = true;
               this.loadingLogin = false;
            });
        },
        resetPass(){
            if(!this.formToReset.password === this.formToReset.passwordConfirmed) {
               this.errorSnackBarPassMatch.snackbar = true;
               return;
            }

            this.loadingLogin = true;
            axios.put(`${BASE_URL}/resetpassword/innitreset`, this.formToReset)
            .then((response) =>{
               console.log(response.data);
            //    this.formToReset.email = initReset.email;
            //    this.formToReset.secretQuestion = initReset.secretQuestion;

                this.sendEmail = true;
            //    const { token, user } = response.data;
               this.loadingLogin = false;
            //    localStorage.setItem('user-cyber-vue', JSON.stringify(user));
            //    localStorage.setItem('token-cyber-vue', token);
            //    this.trackLogin();
               this.sucessSnackBar.snackbar = true;
               setTimeout(()=>{this.$router.push('/');},1000);
            })
            .catch(() => {
               this.errorSnackBar.snackbar = true;
               this.loadingLogin = false;
            });
        },
        disableLogin() {
            if (this.resetPassword.email.trim() === "" || this.resetPassword.password.trim() === "") {
                return true;
            } else {
                return false;
            }
        },
        trackLogin(){
            this.$gtag.event('login_user', {
                'event_category' : 'engagement',
                'event_label' : 'login_user'
            })
        },
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>



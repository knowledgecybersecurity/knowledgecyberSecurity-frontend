<template> 
    <v-app id="inspire">
      <v-main>
         <v-container fluid>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="teal lighten-2">
                        <v-toolbar-title>Login</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="email"
                              name="Email"
                              label="Email"
                              type="text"
                              v-model="loginUser.email"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="loginUser.password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn class="" :disabled="disableLogin() || loadingLogin" color="teal lighten-2" @click="onLogin()">
                         <v-progress-circular v-if="loadingLogin"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                            Login
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
   </v-app>
</template>

<script>
import axios from 'axios';
import {BASE_URL} from '../variables/variables.js'

export default {
    name: "Login",
    data:()=>({
        loginUser: {
            email: '',
            password: ''
        },
        loadingLogin: false,
    }),
    methods:{
        onLogin(){
            const userToLogin = {
                email: this.loginUser.email,
                password: this.loginUser.password
            }
            this.loadingLogin = true;
            axios.post(`${BASE_URL}/users/login`, userToLogin)
            .then((response) =>{
                console.log(response.data);
                const { token, user } = response.data;
                this.loadingLogin = false;
                localStorage.setItem('user-cyber-vue', JSON.stringify(user));
                localStorage.setItem('token-cyber-vue', token);
                this.trackLogin();
                this.$router.push('/');
            });
        },
        disableLogin() {
            if (this.loginUser.email.trim() === "" || this.loginUser.password.trim() === "") {
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



<template> 
    <v-app id="inspire">
      <v-content>
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
                         <v-btn :disabled="disableLogin()" color="teal lighten-2" @click="onLogin()">Login</v-btn>
                     </v-card-actions>
                     <div class="my-3 mx-3 px-3 py-3" align-center justify-center>
                        <label>You do not have an account? </label>
                        <label><router-link to="/sign-up">Sign up here</router-link></label>
                     </div>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
    name: "Login",
    data:()=>({
        loginUser: {
            email: '',
            password: ''
        }
    }),
    methods:{
        onLogin(){
            const userToLogin = {
                email: this.loginUser.email,
                password: this.loginUser.password
            }
            console.log('user to login', userToLogin);
            
        },
        disableLogin() {
            if (this.loginUser.email.trim() === "" || this.loginUser.password.trim() === "") {
                return true;
            } else {
                return false;
            }
        }
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>



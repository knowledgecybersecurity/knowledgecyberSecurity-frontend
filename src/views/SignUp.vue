<template>
<v-app id="inspire">
      <v-content>
         <v-container fluid>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="teal lighten-2">
                        <v-toolbar-title>Sign Up</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                            <v-text-field
                              prepend-icon="person"
                              name="First Name"
                              label="First Name"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="person"
                              name="Last Name"
                              label="Last Name"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="email"
                              name="Email"
                              label="Email"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="lock"
                              name="Password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="contact_page"
                              name="Age"
                              label="Age"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="language"
                              name="Country"
                              label="Country"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="trending_flat"
                              name="Address"
                              label="Address"
                              type="text"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn color="teal lighten-2" @click="onSignUp()">Sign Up</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
    name: "SignUp",
    data:()=>({
        userRegister: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            age: 18,
            country: "",
            address: ""
        }
    }),
    methods:{
        onSignUp(){
            
        },
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>



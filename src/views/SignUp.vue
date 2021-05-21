<template>
<v-app id="inspire">
      <v-main>
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
                              v-model="userRegister.firstName"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="person"
                              name="Last Name"
                              label="Last Name"
                              type="text"
                              v-model="userRegister.lastName"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="email"
                              name="Email"
                              label="Email"
                              type="text"
                              v-model="userRegister.email"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="lock"
                              name="Password"
                              label="Password"
                              type="password"
                              v-model="userRegister.password"
                           ></v-text-field>
                           <v-select
                           prepend-icon="contact_page"
                           :items="ageList"
                           label="Age"
                           v-model="userRegister.age"
                           ></v-select>
                           <v-select
                           prepend-icon="language"
                           :items="countries"
                           label="Country"
                           v-model="userRegister.country"
                           ></v-select>
                           <v-text-field
                              prepend-icon="trending_flat"
                              name="Address"
                              label="Address"
                              type="text"
                              v-model="userRegister.address"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn :disabled="disableSignUp() || loadingSignUp" color="teal lighten-2" @click="onSignUp()">
                         <v-progress-circular v-if="loadingSignUp"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                         Sign Up
                         </v-btn>
                     </v-card-actions>
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
   </v-app>
</template>

<script>
import axios from 'axios';
import {BASE_URL} from '../variables/variables.js'

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
        },
        countries:  ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
        loadingSignUp: false,
        ageList: [],
        sucessSnackBar : {
            snackbar: false,
            text: 'Sign Up successful!!',
            timeout: 2000
        },
        errorSnackBar : {
            snackbar: false,
            text: 'Sign Up Error!!',
            timeout: 2000
        }
    }),
    methods:{
        onSignUp(){
            const userToSignUp = {
                firstName: this.userRegister.firstName,
                lastName: this.userRegister.lastName,
                email: this.userRegister.email,
                password: this.userRegister.password,
                age: this.userRegister.age,
                country: this.userRegister.country,
                address: this.userRegister.address
            }

            this.loadingSignUp = true;

            axios.post(`${BASE_URL}/users/register`, userToSignUp)
            .then((response) =>{
                console.log(response.data);
                this.loadingSignUp = false;
                this.trackSignUp();
                this.sucessSnackBar.snackbar = true;
                setTimeout(()=>{this.$router.push('/');},1000);
            })
            .catch(() => {
               this.errorSnackBar.snackbar = true;
               this.loadingLogin = false;
            });
        },
        disableSignUp() {
            if (this.userRegister.firstName.trim() === "" || 
                this.userRegister.lastName.trim() === "" ||
                this.userRegister.email.trim() === "" ||
                this.userRegister.password.trim() === "" ||
                this.userRegister.age < 18 ||
                this.userRegister.country.trim() === ""
                //|| this.userRegister.address.trim() === ""
            ) {
                return true;
            } else {
                return false;
            }
        },
        trackSignUp(){
            this.$gtag.event('sign_up_user', {
                'event_category' : 'engagement',
                'event_label' : 'sign_up_user'
            })
        },
    },
    mounted() {
        let ageCont = 18;
        while(ageCont < 99) {
            this.ageList.push(ageCont);
            ++ageCont;
        }
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>



<template>
<v-app>
  <v-app-bar app
    color="#42b883"
    dark>    
    <v-app-bar-title>
      Knowledge CyberSecurity
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="links">
      <router-link  to="/">Home</router-link>
      <router-link v-if="!isLoged()" to="/login">Login</router-link>
      <label v-if="isLoged()" @click="logout()">Logout</label>
    </div>
       
  </v-app-bar>
  <v-main>
    <router-view/>
  </v-main>
</v-app>
</template>
<script>
export default {
    name: "App",
    data:()=>({
    }),
    methods:{
      isLoged() {
        const token = localStorage.getItem('token-cyber-vue') 
        return token === null ? false : true;
      },
      logout() {
        localStorage.removeItem('token-cyber-vue');
        this.$router.push('/login');
      }
    },
    computed: {
        
    }
}
</script>

<style scoped>
.links > * {
  margin: 20px;
  text-decoration: none;
  color: #FFFFFF;
}
</style>


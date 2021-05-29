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
      <!-- <label v-if="isLoged()" @click="logout()">Logout</label> -->
    </div>
    <div v-if="isLoged()">
      <v-col cols="12">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <!-- {{ getUserEmail() }} -->
            <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title @click="selectProfileAction(item)">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
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
      items: [
        // { title: 'Profile', action: 'profile'},
        { title: 'Favorites', action: 'favorites'},
        { title: 'Log Out', action: 'logout'},
      ],
    }),
    methods:{
      isLoged() {
        const token = localStorage.getItem('token-cyber-vue') 
        return token === null ? false : true;
      },
      logout() {
        localStorage.removeItem('token-cyber-vue');
        localStorage.removeItem('user-cyber-vue');
        this.$router.push('/login');
      },
      getUserEmail() {
        const user = JSON.parse(localStorage.getItem('user-cyber-vue'));
        return user.email;
      },
      selectProfileAction(item) {
        switch (item.action) {
          case 'profile':
            
            break;

          case 'favorites':
            this.$router.push('/favorites');
            console.log('a favoritos');
            break;
          
          case 'logout':
            this.logout();
            break;
        
          default:
            break;
        }
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


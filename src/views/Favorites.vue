<template> 
    <v-app id="inspire">
      <v-main>
         <v-container fluid>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8>
                    <template>
                         <v-toolbar dark color="teal lighten-2">
                        <v-toolbar-title>Favorite papers</v-toolbar-title>
                     </v-toolbar>
                    <v-data-table
                        :headers="headers"
                        :items="papers"
                        :search="search"
                        :loading="isLoadingTable"
                        loading-text="Loading Papers..."
                    >
                        <template
                        v-slot:body="{ items }"
                        >
                        <tbody>
                            <tr
                            v-for="item in items"
                            :key="item.title"
                            >
                            <td><span @click="goToLink(item)" class="text-hover">{{ item.title }}</span></td>
                            <td>{{ item.year }}</td>
                            <td>{{ item.doi }}</td>
                            <td>{{ item.authors }}</td>
                            <td>{{ item.documentType }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-data-table>
                    </template>

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
    name: "Favorites",
    data:()=>({
        headers: [
          {
            text: 'Paper Name',
            align: 'start',
            filterable: true,
            value: 'title',
          },
          { text: 'Year', value: 'year' },
          { text: 'DOI', value: 'doi' },
          { text: 'Authors', value: 'authors' },
          { text: 'Doc. Type', value: 'documentType' },
        ],
        papers: [
          // {title: '',
          // year: '',
          // doi: '',
          // authors: '',
          // documentType: ''},
        ],
        isLoadingTable: false
    }),
    methods:{
        goToLink(item){
            window.open(item.link,'_blank');
        }

    },
    mounted() {
        const userLoged = JSON.parse(localStorage.getItem('user-cyber-vue'));
        this.isLoadingTable = true;
        axios.get(`${BASE_URL}/users/findFavorite/${userLoged.id}`)
            .then((response) =>{
                this.papers = response.data;
                this.isLoadingTable = false;
            })
            .catch(() => {
               this.errorSnackBar.snackbar = true;
            });
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>



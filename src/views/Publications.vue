<template> 
    <v-app id="inspire">
      <v-main>
         <v-container fluid>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                     <h2>Publications</h2>
                     <v-row>
                        <v-col class="text-right">
                           <v-btn>+ Add Publication</v-btn>
                        </v-col>
                     </v-row>

                     <v-row>
                        <!-- insert list publications -->
                        <v-col cols="12">
                           <v-card
                              class="mx-auto"
                              max-width="auto"
                              outlined
                           >
                              <v-list-item three-line>
                                 <v-list-item-content>
                                 <div class="text-overline mb-4">
                                    Insert autor
                                 </div>
                                 <v-list-item-title class="text-h5 mb-1">
                                    Insert Title
                                 </v-list-item-title>
                                 <v-list-item-subtitle>first 50 caracters of first paragraph...</v-list-item-subtitle>
                                 </v-list-item-content>

                                 <v-list-item-avatar
                                 tile
                                 size="80"
                                 color="grey"
                                 ></v-list-item-avatar>
                              </v-list-item>

                              <v-card-actions>
                                 <v-btn
                                 outlined
                                 rounded
                                 text
                                 >
                                 Open
                                 </v-btn>
                              </v-card-actions>
                           </v-card>
                        </v-col>
                     </v-row>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
export default {
    name: "Publications",
    data:()=>({

    }),
    methods:{

    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>



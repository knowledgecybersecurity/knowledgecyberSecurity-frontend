<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <h2>Publications</h2>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn @click="goToAddPublication()">+ Add Publication</v-btn>
              </v-col>
              <v-col v-if="loadingPublication" cols="12" class="text-center">
                <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
              </v-col>
            </v-row>

            <v-row>
                

              <!-- insert list publications -->
              <v-col cols="12">
                <v-card v-for="(item, index) in publications" :key="index" class="mx-auto" max-width="auto" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="text-overline mb-4">{{item.userDTO.firstName}}, {{item.userDTO.lastName}}</div>
                      <v-list-item-title class="text-h5 mb-1">
                        {{item.title}}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >{{item.firstParagraph.substring(0,100) + '...'}}</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                    >
                    <img
                        v-bind:src="item.imageUrl"
                        alt="user"
                      >
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn @click="goToPublication(item.id)" outlined rounded text> Open </v-btn>
                  </v-card-actions>
                </v-card>
                <v-col cols="12" class="text-right">
                <v-btn v-if="currentPagination>0" @click="prevPage(--currentPagination)">prev</v-btn>
                <v-btn v-if="!isLast" @click="nextPage(++currentPagination)">next</v-btn>
              </v-col>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../variables/variables";

export default {
  name: "Publications",
  data: () => ({
    publications: [],
    loadingPublication: false,
    currentPagination: 0,
    isLast: true,
  }),
  methods: {
    goToPublication(id) {
      this.$router.push(`/publication/${id}`);
    },
    goToAddPublication() {
      this.$router.push("/addPublication");
    },
    getPublications(page) {
      this.currentPagination = page;
      this.publications = [];
      this.loadingPublication = true;
      axios.get(`${BASE_URL}/publications/listAll/${page}/5`)
        .then((response) =>{
          this.publications = response.data.content;
          this.loadingPublication = false;
          this.isLast = response.data.last;
        });
    },
    nextPage(page) {
      this.getPublications(page);
    },
    prevPage(page) {
      this.getPublications(page);
    }
  },
  mounted(){
      this.getPublications(this.currentPagination);
  },
  computed: {},
};
</script>

<style scoped>
</style>



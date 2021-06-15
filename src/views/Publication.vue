<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <h1>{{publication.title}}</h1>
            <v-row>
              <v-col cols="12" class="my-3">
                  <strong>{{publication.user.firstName}}, {{publication.user.lastName}}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="my-5">
                  {{publication.firstParagraph}}
              </v-col>

              <v-col class="my-3" cols="12">
                  {{publication.firstParagraph}}
              </v-col>

                <v-col  v-if="publication.imageUrl != null" class="my-3" cols="12">
                  <img class="col-12"
                        v-bind:src="publication.imageUrl"
                    >
                </v-col>
            </v-row>

            <v-row v-for="(item, index) in publication.sectionPublications" :key="index">
              <v-col cols="12" class="my-3">
                  <h3>{{item.subtitle}}</h3>
              </v-col>
              <v-col cols="12" class="my-3">
                  {{item.paragraph}}
              </v-col>
              <v-col v-if="item.imageUrl != null" cols="12" class="my-3">
                  <img class="col-12"
                        v-bind:src="item.imageUrl"
                    >
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
  name: "Publication",
  data: () => ({
      publication: {
          title: ''
      },
      loadingPublication: false,
  }),
  methods: {
    getPublication() {
        this.loadingPublication = true;
        const id = this.$route.params.idPublication;
        axios.get(`${BASE_URL}/publications/find/${id}`)
        .then((response) =>{
          this.publication = response.data;
          this.loadingPublication = false;
        });
    }
  },
  mounted(){
      this.getPublication();
  },
  computed: {},
};
</script>

<style scoped>
</style>



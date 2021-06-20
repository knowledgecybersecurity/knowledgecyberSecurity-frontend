<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <div>
            <div class="d-inline-flex">
              <v-btn icon
              @click="$router.go(-1); trackBackWorkRole()"
              color="blue accent-3">
                <v-icon>mdi-subdirectory-arrow-left</v-icon>
              </v-btn>
            </div>
            <div class="d-inline-flex">
                <h2>Back</h2>
            </div>
          </div>
            <v-card-text>
              <v-form>
                <h2>Add publication</h2>
                <br />
                <v-text-field
                  name="Title"
                  label="Title"
                  type="text"
                  v-model="publication.title"
                ></v-text-field>
                <v-textarea
                  name="input-7-1"
                  label="First Paragraph"
                  rows="4"
                  no-resize
                  v-model="publication.firstParagraph"
                ></v-textarea>
                <v-text-field
                  name="url"
                  label="Image URL"
                  type="url"
                  v-model="publication.imageUrl"
                ></v-text-field>
                <v-row>
                  <v-col class="text-right">
                    <v-btn @click="addSection()">+ Add section</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    class="text-center"
                    v-if="publication.sectionPublications.length === 0"
                  >
                    <h2>You can add sections</h2>
                  </v-col>
                </v-row>
                <template
                  v-for="(item, index) in publication.sectionPublications"
                >
                  <v-row :key="index" class="text-left">
                    <v-col>
                      <div
                        :style="{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }"
                      >
                        <h4>Section {{ index + 1 }}</h4>
                        <v-btn icon color="red" @click="deleteSection(index)">
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </div>
                      <v-text-field
                        name="Subtitle"
                        label="Subtitle"
                        type="text"
                        v-model="item.subtitle"
                      ></v-text-field>
                      <v-textarea
                        name="input-7-1"
                        label="Paragraph"
                        rows="3"
                        no-resize
                        v-model="item.paragraph"
                      ></v-textarea>
                      <v-text-field
                        name="url"
                        label="Image URL"
                        type="url"
                        v-model="item.imageUrl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                <v-card-actions>
                  <v-btn
                    class=""
                    color="teal lighten-2"
                    @click="addPublication()"
                    :style="{ margin: '20px auto' }"
                  >
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                    Add
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../variables/variables";
import Swal from "sweetalert2";

export default {
  name: "AddPublication",
  data: () => ({
    loading: false,
    Section: {
      subtitle: "",
      paragraph: "",
      imageUrl: "",
    },
    publication: {
      title: "",
      firstParagraph: "",
      imageUrl: "",
      sectionPublications: [],
      idUser: 0,
    },
  }),
  methods: {
    trackBackWorkRole(){
      console.log('back_action_work_role')
      this.$gtag.event('back_action_work_role', {
          'event_category' : 'engagement',
          'event_label' : 'back_action_work_role'
      })
    },
    addSection() {
      let s = {
        subtitle: "",
        paragraph: "",
        imageUrl: "",
      };

      this.publication.sectionPublications.push(s);
    },
    addPublication() {
      const user = JSON.parse(localStorage.getItem("user-cyber-vue"));
      this.publication.idUser = user.id;
      this.loading = true;
      axios
        .post(`${BASE_URL}/publications/create`, this.publication)
        .then((response) => {
          if (response.data) {
            Swal.fire("Good job!", "Yo registered a publication", "success");
            this.publication = {
              title: "",
              firstParagraph: "",
              imageUrl: "",
              sectionPublications: [],
              idUser: 0,
            };
          }
        })
        .catch(() => {
          this.loadingLogin = false;
        });
      this.loading = false;
    },
    deleteSection(index) {
      this.publication.sectionPublications.splice(index, 1);
    },
  },
  computed: {},
};
</script>

<style scoped></style>

<template>
    <v-container>
        <div>
          <div class="d-inline-flex">
            <v-btn icon
              @click="$router.go(-1); trackBackResearch()"
              color="blue accent-3">
                <v-icon>mdi-subdirectory-arrow-left</v-icon>
            </v-btn>
          </div>
          <div class="d-inline-flex">
            <h2>
              Back
            </h2>
          </div>
          <div class="d-flex justify-end switch-big">
            <v-switch
              class="big-label"
              v-model="filterMode"
              :label="filterMode? 'By Knowledge Objectives': 'By keywords'"></v-switch>
          </div>
        </div>
        <div v-if="!filterMode">
          <h1 class="text-center mx-auto mb-6">Search {{this.$route.params.researchName}} Papers by Keywords</h1>
          <v-text-field
            v-model="newKeyword"
            label="Keyword"
            append-icon="mdi-plus-circle-outline"
            single-line
            hide-details
            @click:append="addFilterItems(newKeyword); trackSearch()"
            class="search-text-field"
            >
          </v-text-field>
          <div class="d-flex justify-start mt-5">
            <span class="mvp-kw-text">Most used keywords: </span>
            <v-card
            height="100%"
            v-for="kw in bestKeywords" :key="kw.name"
            dark
            @click="addFilterItems(kw.name)"
            class="mx-1 pa-1 red lighten-2">
              <span>{{kw.name}}</span>
            </v-card>
          </div>
        </div>
        <br>
        <div v-if="filterMode">
            <h1 class="text-center mx-auto mb-6">Search by Knowledge Objectives</h1>
            <br>
          </div>
        <v-card elevation="5" min-height="90px">
          <v-card-text v-if="filterItems.length === 0 && !filterMode" style="font-size: 16px; font-style: italic">
            No keywords added yet. If no keywords to filter by it will show all papers that are present in the current sector
          </v-card-text>
          <v-container fluid>
            <v-row v-if="!filterMode">
              <v-col v-for="item in filterItems" :key="item.id">
                <v-card color="#42b883" dark>
                  <v-card-text  class="text-center" >
                    {{item}}
                    <v-btn icon>
                       <v-icon @click="removeFilterItems(item); trackRemoveFilters()">mdi-minus-circle-outline</v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col v-for="item in koItems" :key="item.name">
                <v-tooltip bottom color="primary">
                  <template v-slot:activator="{on}">
                    <v-card
                    v-on="on"
                    :class="item.clicked? 'green accent-2':'grey accent-1'"
                    @click="checkKO(item)"
                    min-width="100%"
                    height="80px"
                    >
                      <v-card-text class="text-center" >
                        <b>{{item.name}}</b>
                      </v-card-text>
                    </v-card>
                  </template>
                  <span >Cant. Papers: {{item.paper_amount == null? 0 : item.paper_amount}}</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>                              
        </v-card>
        <div class="d-flex justify-end my-3">
          <v-btn depressed color="white" @click="expand = !expand; trackAdvancedFilters()">
            <span>Advanced Filter</span>
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </div>
        <div>
          <v-expand-transition>
            <v-card
            v-show="expand"
            width="50vw"
            class="mx-auto"
            >
              <v-list>
                <v-list-item v-for="adItem in advancedItems" :key="adItem.id">
                  <v-list-item-icon>
                    <v-icon>{{adItem.icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content v-if="adItem.label != 'Year'">
                    <v-text-field :label="adItem.label" v-model="adItem.value"></v-text-field>
                  </v-list-item-content>
                  <v-list-item-content v-else>
                    <div class="d-flex justify-space-around">
                      <v-text-field label="Min Year" v-model="adItem.value" ></v-text-field>
                      <v-icon class="mx-4">mdi-arrow-expand-horizontal</v-icon>
                      <v-text-field label="Max Year" v-model="endYear" ></v-text-field>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-expand-transition>
        </div>
        <br/>
        <div class="mx-auto text-center my-3">
          <v-btn color="black accent-2" :disabled="loadingData" dark @click="onClickFilter();trackFilter()">
            <v-progress-circular v-if="loadingData"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                         Search
          </v-btn>
        </div>
        <v-alert
          :value="alert"
          color="blue-grey darken-1"
          dark
          border="top"
          icon="mdi-home"
          transition="scale-transition"
        >
          In order to enjoy the search services of this page you will have to <router-link  to="/login">log in</router-link> or <router-link  to="/sign-up">register</router-link>.
        </v-alert>
        <br/>
        <v-divider></v-divider>
        <br>
        <v-card>
          <v-card-title>
            Search Results
          </v-card-title>
          <!-- <div v-if="loadingData">Loading...</div> -->
          <v-data-table
            :headers="headers"
            :items="papers"
            :search="search"
            :loading="loadingData"
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
                  <td>
                    <v-btn v-if="!item.isFavoriteForThisUser" :disabled="item.loading" color="teal lighten-2"
                      @click="selectBookMarkFavorite(item)"
                      class="ma-2"
                      dark
                    >
                    <v-progress-circular v-if="item.loading"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                      <v-icon
                        dark
                        v-if="!item.loading"
                      >
                        bookmark
                      </v-icon>
                    </v-btn>
                    <v-btn v-if="item.isFavoriteForThisUser" :disabled="item.loading" color="black"
                      @click="unselectBookMarkFavorite(item)"
                      class="ma-2"
                      dark
                    >
                    <v-progress-circular v-if="item.loading"
                            indeterminate
                            color="primary"
                            ></v-progress-circular>
                      <v-icon
                        dark
                        v-if="!item.loading"
                      >
                        bookmark
                      </v-icon>
                    </v-btn>
                  </td>
                  </tr>
               </tbody>
            </template>
          </v-data-table>
        </v-card>
        <br>
        <div v-if="!filterActive" class="d-flex justify-center">
          No papers have been filtered yet
        </div>
        <v-snackbar
          v-model="snackBarBookMark.show"
          :timeout="snackBarBookMark.timeout"
          color="teal darken-2"
        >
          {{ snackBarBookMark.text }}

          <template>
          </template>
        </v-snackbar>
            
    </v-container>
</template>

<script>
  import axios from 'axios'
  import {BASE_URL} from '../variables/variables.js'
  export default {
    data () {
      return {
        idKU: this.$route.params.idKU,
        sectorID: this.$route.params.sectorId,
        expand: false,
        filterMode: false,
        newKeyword: '',
        filterActive: false,
        filterItems: [],
        loadingData: false,
        bestKeywords:[],
        endYear: '',
        koItems: [
        ],
        advancedItems: [
          {label: 'Title', icon: 'mdi-subtitles-outline', value: ''},
          {label: 'Year', icon: 'mdi-calendar-range',value: ''},
          {label: 'DOI', icon: 'mdi-counter',value: ''},
          {label: 'Author', icon: 'mdi-account',value: ''},
        ],
        search: '',
        checkedKO: {id : -1, name:''},
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
        alert: false,
        snackBarBookMark: {
          show: false,
          text: '',
          timeout: 2000,
        }
      }
    },
    methods:{
      addFilterItems(kw){
        if(kw !== ''){
          kw = kw.trim();
          this.filterItems.push(kw);
          this.newKeyword = '';  
        }
        else{
          alert('Please enter at least a keyword');
        }
             
      },
      trackSearch(){
        console.log('evento search')
            this.$gtag.event('search', {
                'event_category' : 'engagement',
                'event_label' : 'search'
            })
      },
      trackFilter(){
        console.log('evento filter')
            this.$gtag.event('filter', {
                'event_category' : 'engagement',
                'event_label' : 'filter'
            })
      },
      trackAdvancedFilters(){
        console.log('evento search')
            this.$gtag.event('advanced_filters', {
                'event_category' : 'engagement',
                'event_label' : 'advanced_filters'
            })
      },
      trackRemoveFilters(){
        console.log('evento search')
            this.$gtag.event('remove_filters', {
                'event_category' : 'engagement',
                'event_label' : 'remove_filters'
            })
      },
      trackBackResearch(){
        console.log('evento search')
            this.$gtag.event('back_research', {
                'event_category' : 'engagement',
                'event_label' : 'back_research'
            })
      },
      removeFilterItems(kw){
        let index = this.filterItems.indexOf(kw);
        this.filterItems.splice(index,1);        
      },
      onClickFilter(){
        const userLoged = JSON.parse(localStorage.getItem('user-cyber-vue'));
        const token = localStorage.getItem('token-cyber-vue');

        if (token) {
          console.log('SE EEJCUTA');
          if(this.filterMode && this.checkedKO.id == -1){
          alert('Chooseat least 1 knowledge objective')
          }
          else{
            console.log('Comienza a cargar');
            this.loadingData = true;
            const year1 = this.advancedItems[1].value;
            const year2 = this.endYear;
            const title = this.advancedItems[0].value;
            const doi = this.advancedItems[2].value;
            const autor = this.advancedItems[3].value;
            let kws = this.filterItems.join(';');
            let idKO = this.checkedKO.id;
            if (this.filterMode){kws ='';}
            else{
              idKO = '';
            }
            console.log('Se llamara a axios');
            console.log('this.loadingData', this.loadingData);
            axios.get(BASE_URL+`/knowledge-units/${this.idKU}/sectors/${this.sectorID}/papers/${userLoged.id}?keywords=${kws}&startYear=${year1}&endYear=${year2}&title=${title}&doi=${doi}&author=${autor}&koId=${idKO}`)
            .then( (response) => {
              this.papers = response.data; 
              console.log('Se obutvo los papers');
              console.log('******************');
              console.log(this.papers);
              this.filterActive = true;
              this.loadingData = false;
          });
        }
        } else {
          this.alert = true;
        }
        
      },
      getKOs(){
        axios.get(BASE_URL+`/knowledge-units/${this.idKU}/sectors/${this.sectorID}/knowledge-objectives`)
        .then( (response) =>{
          let newkoItems = response.data;
          this.koItems = newkoItems.map(function(obj){
          let o =  Object.assign({},obj);
          o.clicked = false;
          return o;
          });          
        });
      },
      selectBookMarkFavorite(item) {
        const idUser = JSON.parse(localStorage.getItem('user-cyber-vue')).id;
        const idPaper = item.id;
        axios.get(BASE_URL+`/users/${idUser}/${idPaper}`)
        .then((response) => {
          item.isFavoriteForThisUser = true;
          this.papers = this.papers.map(x => x.id === item.id ? item : x);
          console.log(response);
          this.snackBarBookMark.text = 'Add to favorites';
          this.snackBarBookMark.show = true;
        });
      },
      unselectBookMarkFavorite(item) {
        const idUser = JSON.parse(localStorage.getItem('user-cyber-vue')).id;
        const idPaper = item.id;
        axios.get(BASE_URL+`/users/unmarked/${idUser}/${idPaper}`)
        .then((response) => {
          item.isFavoriteForThisUser = false;
          this.papers = this.papers.map(x => x.id === item.id ? item : x);
          console.log(response);
          this.snackBarBookMark.text = 'Remove from favorites';
          this.snackBarBookMark.show = true;
        });
      },
      getBestKW(){
        axios.get(BASE_URL+`/knowledge-units/${this.idKU}/sectors/${this.sectorID}/keywords`)
        .then( (response) =>{
          this.bestKeywords = response.data;  
        });
      },
      checkKO(item){
        if(this.koItems.every(ko => !ko.clicked)){
          item.clicked = true;
          this.checkedKO = item;
        }
        else{
          item.clicked = false;
          if(item.name == this.checkedKO.name){
            this.checkedKO = {id: -1, name: ''};
          }
        }
      },
      goToLink(item){
        window.open(item.link,'_blank');
      }
    },
    mounted(){
      this.getKOs();
      this.getBestKW();
    },
    rowIsFavorite(item) {
      if (item.isFavoriteForThisUser) {
        return "teal lighten-5"
      } else {
        return "white";
      }
    }
  }
</script>

<style scoped>
    .search-text-field{
      width: 250px;
    }
    .text-hover{
      text-decoration: underline;
    }
    .text-hover:hover{
      color:cornflowerblue;
      cursor: pointer;
    }
    .big-label >>> label{
      font-size: 20px;
    }
    .mvp-kw-text{
      margin: 5px 15px 0px 0px;
      font-style: oblique;
    }
</style>

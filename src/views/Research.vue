<template>
    <v-container>
        <div>
          <div class="d-inline-flex">
            <v-btn icon
              @click="$router.go(-1); trackBackResearch()"
              v-on="on"
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
          <h1 class="text-center mx-auto mb-6">Search by Keywords</h1>
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
              <v-col v-for="item in filterItems" :key="item">
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
                <v-list-item v-for="adItem in advancedItems" :key="adItem">
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
        <br>
        <div class="mx-auto text-center">
          <v-btn color="black accent-2" dark @click="onClickFilter();trackFilter()">
            Search
          </v-btn>
        </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card>
          <v-card-title>
            Search Results
          </v-card-title>
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
                  </tr>
               </tbody>
            </template>
          </v-data-table>
        </v-card>
        <br>
        <v-header v-if="!filterActive" class="d-flex justify-center">
          No papers have been filtered yet
        </v-header>
        
        
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
          {title: '',
          year: '',
          doi: '',
          authors: '',
          documentType: ''},

        ],
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
        if(this.filterMode && this.checkedKO.id == -1){
          alert('Chooseat least 1 knowledge objective')
        }
        else{
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
          axios.get(BASE_URL+`/knowledge-units/${this.idKU}/sectors/${this.sectorID}/papers?keywords=${kws}&startYear=${year1}&endYear=${year2}&title=${title}&doi=${doi}&author=${autor}&koId=${idKO}`)
          .then( (response) => {
            this.papers = response.data; 
            this.filterActive = true;
            this.loadingData = false;
        });
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

<template>
  <div>
    <br>
    <div>
      <div class="d-inline-flex">
        <v-btn icon
        @click="$router.go(-1)"
        color="blue accent-3">
          <v-icon>mdi-subdirectory-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="d-inline-flex">
           <h2>Back</h2>
      </div>
    </div>
    
    <!--AQUÍ IRÍA LA DESCRIPCIÓN DEL KNOWLEDGE UNIT-->
    <div  class="text-center mx-auto">
      <h1>{{KU}}</h1>
      <v-header>{{KU_description}}</v-header>
    </div>

    <v-container v-model="unidades" class="mt-8">
      <v-row no-gutters>
         <!--..................Left Side.......................-->
        <v-col cols="12" sm="6" md="6">
          <v-list>
            <v-list-item>
            <v-list-item-content>
                <v-card color="green lighten-4">
                    <v-toolbar color="indigo" dark @click="unidades[0].arrow = !unidades[0].arrow; trackCertifications()">
                        <v-toolbar-title>{{unidades[0].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon>
                          <v-icon v-if="unidades[0].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[0].arrow">
                    <h3 v-if="unidades[0].items.length === 0">There are no Certifications yet in the present Knowledge Unit</h3>
                    <v-list-item v-for="unit in unidades[0].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <a 
                         style="text-decoration: none;"
                         :href="unit.link" target="_blank">
                          {{unit.name}}
                         </a>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
            <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark @click="unidades[1].arrow = !unidades[1].arrow; trackCongresses()">
                        <v-toolbar-title>{{unidades[1].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon>
                          <v-icon v-if="unidades[1].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[1].arrow">
                    <h3 v-if="unidades[1].items.length === 0">There are no Congresses yet in the present Knowledge Unit</h3>
                    <v-list-item v-for="unit in unidades[1].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <p>
                          {{unit.name}} [{{unit.date}}]
                         </p>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
            <v-list-item-content>
                <v-card color="green lighten-4">
                    <v-toolbar color="indigo" dark @click="unidades[2].arrow = !unidades[2].arrow; trackTools()">
                        <v-toolbar-title>{{unidades[2].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon >
                          <v-icon v-if="unidades[2].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[2].arrow">
                    <h3 v-if="unidades[2].items.length === 0">There are no tools yet in the present Knowledge Unit</h3>
                    <v-list-item v-for="unit in unidades[2].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <a 
                         style="text-decoration: none;"
                         :href="unit.paper" target="_blank">
                          {{unit.name}}
                         </a>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <!--....................Right Side.......................-->
        <v-col cols="12" sm="6" md="6">
          <v-list>
            <v-list-item>
                <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark @click="unidades[3].arrow = !unidades[3].arrow; trackPapers()">
                        <v-toolbar-title>{{unidades[3].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon>
                          <v-icon v-if="unidades[3].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[3].arrow">
                    <v-list-item v-for="unit in unidades[3].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <router-link 
                         v-if="!existPapers(unidades[3].id,unit.id)"
                         style="text-decoration: none;"
                         :to="{name: 'Research', params: {idKA : KA, idKU: idKU, researchName: unit.name, sectorId: unit.id } }">
                          {{unit.name}}
                         </router-link>
                         <v-tooltip bottom v-else>
                           <template v-slot:activator="{on}">
                             <p
                             v-on="on"
                             class="no-papers-sector">
                               {{unit.name}}
                             </p>
                           </template>
                           <span>This sector has no papers</span>
                         </v-tooltip>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark @click="unidades[4].arrow = !unidades[4].arrow; trackWorRoles()">
                        <v-toolbar-title>{{unidades[4].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon>
                          <v-icon v-if="unidades[4].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[4].arrow">
                      <h3 v-if="unidades[4].items.length === 0">There are no work roles yet in the present Knowledge Unit</h3>
                      <v-list-item v-for="unit in unidades[4].items" :key="unit.id">
                        <v-list-item-content>
                          <v-card 
                          class="pa-3">
                          <p
                            class="link-like-text"
                            @click="onClickWr(unit)">
                            {{unit.name}}
                          </p>
                          
                          </v-card>                      
                        </v-list-item-content>
                      </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>                       
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from 'axios';
import {BASE_URL} from '../variables/variables.js'
export default {
  props: {},
  data() {
    return {
      KA: this.$route.params.idKA,
      KU: this.$route.params.KUName,
      idKU: this.$route.params.idKU,
      KU_description: localStorage.getItem('KU_Description'),
      unidades: [
        {title:'Certifications',arrow: false,items:[]},
        {title:'Congress',arrow: false,items:[]},
        {title:'Tools',arrow: false,items:[]},
        {title:'Research',arrow: false,items:[]},
        {title:'Work Roles',arrow: false,items:[]}
        ],
    };
  },
  methods:{
      certificatesByKU(){
        axios.get(BASE_URL + `/knowledge-units/${this.idKU}/certificates`)
        .then( (response) => {this.unidades[0].items = response.data});
      },
      congresesByKU(){
        axios.get(BASE_URL+ `/knowledge-units/${this.idKU}/congresses`)
        .then( (response) => {this.unidades[1].items = response.data});
      },
      toolsByKU(){
        axios.get(BASE_URL+`/knowledge-units/${this.idKU}/tools`)
        .then( (response) => {this.unidades[2].items = response.data});
      },
      sectorsByKU(){
        axios.get(BASE_URL+`/knowledge-units/${this.idKU}/sectors`)
        .then( (response) => {this.unidades[3].items = response.data});
      },
      workRolesByKU(){
        axios.get(BASE_URL+`/knowledge-units/${this.idKU}/work-roles`)
        .then( (response) => {this.unidades[4].items = response.data});
      },
      existPapers(id1,id2){
        axios.get(BASE_URL+`/knowledge-units/${id1}/sectors/${id2}/keywords`)
        .then( (response) =>{
          let res = response.data;  
          if (res === null) return false;
          else return true; 
        });
      },
      onClickWr(wr){
        localStorage.setItem('wr_description',wr.description)
         this.$router.push({name: 'WorkRoles', params: {wrName: wr.name, wrId: wr.id}});
      },
      trackPapers(){
        console.log('track papers')
            this.$gtag.event('papers', {
                'event_category' : 'engagement',
                'event_label' : 'papers'
            })
      },
      trackWorRoles(){
        console.log('track work roles')
            this.$gtag.event('work_roles', {
                'event_category' : 'engagement',
                'event_label' : 'work_roles'
            })
      },
      trackTools(){
        console.log('evento tools')
            this.$gtag.event('tools', {
                'event_category' : 'engagement',
                'event_label' : 'tools'
            })
      },
      trackCongresses(){
        console.log('evento category')
            this.$gtag.event('category', {
                'event_category' : 'engagement',
                'event_label' : 'category'
            })
      },
      trackCertifications(){
        console.log('evento certifications')
            this.$gtag.event('certifications', {
                'event_category' : 'engagement',
                'event_label' : 'certifications'
            })
      },
  },
  mounted() {
    this.certificatesByKU();
    this.congresesByKU();
    this.toolsByKU();
    this.sectorsByKU();
    this.workRolesByKU();
  }
};
</script>

<style scoped>

v-header{
  color:rgb(167, 161, 161);
}

.link-like-text{
  color: #00AAFF;
}

.link-like-text:hover {
  color: #00AABF;
  cursor: pointer;
}

.no-papers-sector{
  color: #800040;
}

.v-toolbar:hover{
  cursor: pointer;
}
</style>
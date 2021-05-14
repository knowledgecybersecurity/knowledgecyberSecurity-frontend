<template>
  <div>
    <br>
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

    <div  class="text-center mx-auto mb-8">
      <h1>{{wrName}}</h1>
      <v-header>{{wrDescription}}</v-header>
    </div>


    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="6" v-for="m in 2" :key="m">
          <v-list>
            <v-list-item v-for="unidad in unidadesLorR(m)" :key="unidad.title">
                <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark  @click="unidad.arrow = !unidad.arrow;trackContentWorkRole()">
                        <v-toolbar-title>{{unidad.title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon>
                          <v-icon v-if="unidad.arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidad.arrow">
                    <v-list-item v-for="unit in unidad.items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <p>
                          {{unit.description}}
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
import axios from 'axios'
import {BASE_URL} from '../variables/variables.js'
export default {
  props: {},
  data() {
    return {
      wrId: this.$route.params.wrId,
      wrName: this.$route.params.wrName,
      wrDescription: localStorage.getItem('wr_description'),
      ksats: [
      ],
      unidades: [
        {title:'Task',arrow: false,items:[]},
        {title:'Knowledge',arrow: false,items:[]},
        {title:'Skills',arrow: false,items:[]},
        {title:'Abilities',arrow: false,items:[]},
        ],
    };
  },
  methods:{
    unidadesLorR(m){
      if(m == 1){
        return [this.unidades[0],this.unidades[1]];
      }
      else{
        return [this.unidades[2],this.unidades[3]];
      }
    },
    trackBackWorkRole(){
      console.log('back_action_work_role')
      this.$gtag.event('back_action_work_role', {
          'event_category' : 'engagement',
          'event_label' : 'back_action_work_role'
      })
    },
    trackContentWorkRole(){
      console.log('trackContentWorkRole')
      this.$gtag.event('content_work_role', {
          'event_category' : 'engagement',
          'event_label' : 'content_work_role'
      })
    },
    getAllKsats(){
      axios.get(BASE_URL+`/work-roles/${this.wrId}/ksat`)
      .then( (response) => {
        this.ksats = response.data;
        this.unidades[0].items = this.ksats.filter(ksat => ksat.type == "Task");
        this.unidades[1].items = this.ksats.filter(ksat => ksat.type == "Knowledge");
        this.unidades[2].items = this.ksats.filter(ksat => ksat.type == "Skills");
        this.unidades[3].items = this.ksats.filter(ksat => ksat.type == "Abilities");
        });
    },
  },
  mounted(){
      this.getAllKsats();
  }
};
</script>

<style scoped>
v-header{
  color:rgb(167, 161, 161);
}

.v-toolbar:hover{
  cursor:pointer;
}
</style>
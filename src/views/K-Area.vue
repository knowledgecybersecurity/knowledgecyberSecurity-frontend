<template>
  <div align="center">
    <br>
    <h1>Knowledge Areas</h1>
    <br />
    <div>
      <v-list>
        <v-list-item v-for="item in areas" :key="item.id">
          <v-list-item-content>
              <v-card
                class="mx-auto"
                max-width="60vw"
                color="green lighten-4"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                      <v-toolbar
                      color="indigo"
                      v-on ="on"
                      v-on:click="onClickArrow(item); track(item)"
                      dark>
                        <v-toolbar-title>
                          <v-icon>mdi-shield-lock</v-icon>
                          {{item.name}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon v-if="item.arrowed">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-toolbar>
                    </template>
                    <span v-if="!item.arrowed">
                      <ul>
                        <li v-for="ku in kunitsByKA(item.id)" :key="ku.id">{{ku.name}}</li>
                      </ul>            
                    </span>
                  </v-tooltip>
                  <v-card-text v-if="item.arrowed">
                    <p>{{item.definition}}</p>
                    <hr>
                    <br>
                    <v-header class="title-bold">Knowledge Units</v-header>
                    <v-list-item v-for="ku in kunitsByKA(item.id)" :key="ku.id">
                      <v-list-item-content>
                        <v-card 
                        class="mx-auto"
                        @click="onClickKunit(item,ku); trackUnitsByKA(ku)"
                        >
                        <v-card-text>
                          {{ku.name}}
                        </v-card-text>
                        </v-card>
                      </v-list-item-content>
                    </v-list-item>                      
                  </v-card-text>
              </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {BASE_URL} from '../variables/variables.js'
export default {
  name: "KArea",
  data() {
    return {
      areas: [
      ],
      kunits:[

      ]
    };
  },
  methods:{
      getKAreas(){
          axios.get(BASE_URL+'/knowledge-areas')
          .then( (response) => {
            let initialAreas = response.data;
            this.areas = initialAreas.map(function(obj){
            let o =  Object.assign({},obj);
            o.arrowed = false;
            return o;
          });
          });              
      },
      getKUnits(){
        axios.get(BASE_URL+'/knowledge-units')
        .then((response) =>{
          this.kunits = response.data;
        });
      },
      onClickArrow(item){
        item.arrowed = !item.arrowed;
      },
      onClickKunit(item,ku){
        localStorage.setItem('KU_Description',ku.definition)
         this.$router.push({
           name: "KUnit",params:{idKA: item.name, KUName: ku.name, idKU: ku.id}
           });
      },
      kunitsByKA(id){
         let kunits_get = this.kunits.filter(kunit => kunit.knowledgeArea == id);
         if(id == 9){
           kunits_get = kunits_get.slice(0,5);
         }
         return kunits_get;
      },
      createItemTag(item) {
        let itemTag = item.name.replaceAll(' ','_');
        itemTag = 'expand_category_' + itemTag;
        return itemTag;
      },
      track(item){
        const itemTag = this.createItemTag(item);
        console.log('expand-dyn', itemTag);
        this.$gtag.event(itemTag, {
            'event_category' : 'engagement',
            'event_label' : itemTag
        })
      },
      trackUnitsByKA(item) {
        const itemTag = this.createItemTag(item);
        console.log('expand-dyn', itemTag);
        this.$gtag.event(itemTag, {
            'event_category' : 'engagement_ku',
            'event_label' : itemTag
        })
      }
  },
  mounted(){
      this.getKAreas();
      this.getKUnits();
  }

};
</script>

<style scoped>
.title-bold{
    font-weight: 300;
    font-size: 22px;
}

.v-toolbar:hover{
  cursor: pointer;
}
</style>
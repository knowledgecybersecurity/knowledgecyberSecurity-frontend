import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "G-XGR9GN2LLH" }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

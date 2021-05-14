import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-196993715-1" }
}, router);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
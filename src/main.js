import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js'
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];
import vuetify from '@/plugins/vuetify'


defineIonPhaser(window);

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

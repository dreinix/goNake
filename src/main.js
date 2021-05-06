import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js'
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];
import vuetify from '@/plugins/vuetify'
import VueObserveVisibility from 'vue-observe-visibility'


defineIonPhaser(window);
Vue.use(VueObserveVisibility)

new Vue({
  el: '#app',
  vuetify,
  router,
  render: h => h(App),
})

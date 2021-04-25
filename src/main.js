import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js'
import vuetify from 'vuetify';
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

Vue.use(vuetify)

defineIonPhaser(window);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

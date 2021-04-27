import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js'
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];
import vuetify from '@/plugins/vuetify'


defineIonPhaser(window);
router.beforeEach((to, from, next) => {
  if (from.name === 'login') next(location.reload())
  else next()
})
new Vue({
  el: '#app',
  vuetify,
  router,
  render: h => h(App),
})

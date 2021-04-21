import {createApp} from 'vue'
import App from '/src/views/landing.vue'

import router from './router'

//Vue.use(Vuetify);
createApp(App).use(router).mount('#app')

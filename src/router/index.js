import Router from "vue-router";
import Vue from 'vue'
import landing from "@/components/landingPage/landing.vue"
Vue.use(Router)
const routes = [
  { path: "/", name: "Landing",component:landing},
  //{ path: "/", component: "Landing" },
  //{ path: "/home", component: "Home", meta: { requiresAuth: true } },
];

export default new Router({
  routes
})
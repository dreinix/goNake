import Router from "vue-router";
import Vue from 'vue'
import landing from "@/components/landingPage/landing.vue"
import register from "@/components/register/register.vue"
Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", name: "Landing",component:landing},
    { path: "/signup",name:"signup", component: register },
    //{ path: "/home", component: "Home", meta: { requiresAuth: true } },
  ],
  mode: 'history'
})
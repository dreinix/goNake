import Router from "vue-router";
import Vue from 'vue'
import landingcomponent from "@/components/landingPage/landing.vue"
import registercomponent from "@/components/register/register.vue"
import logincomponent from "@/components/login/login.vue"
import viewScoreComponent from "@/components/viewScore/viewScore.vue"
Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", name: "Landing",component:landingcomponent},
    { path: "/signup",name:"signup", component: registercomponent },
    { path: "/login", name:"login",component: logincomponent},
    { path: "/scores", name:"scores",component: viewScoreComponent},
  ],
  mode: 'history'
})

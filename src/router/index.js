import {createRouter,createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Landing",component: "./components/HelloWorld.vue"},
  //{ path: "/", component: "Landing" },
  //{ path: "/home", component: "Home", meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
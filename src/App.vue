<template>
  <v-app :style="image" :dark="true">
    <navigation />
    <v-main>
      <router-view></router-view> 
    </v-main>   
  </v-app>
</template>
<script>
import Landing from '@/components/landingPage/landing.vue'
import navigation from '@/components/navbar/navbar.vue'
import "@/components/landingPage/landing.css";
import axios from 'axios'
import Cookies from "js-cookie";


axios.defaults.withCredentials = true
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${Cookies.get("jwt")}`;
    return config;
  },
  (error) => {
    console.log(error)
    console.log("not auth")
  }
);

export default {
  name: 'app',
  components: {
    Landing,
    navigation
  },
  data(){
    return {
      image: { backgroundImage: `url(${require('@/assets/images/background.jpg')})` },
    }
  }
}

</script>
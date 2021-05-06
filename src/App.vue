<template>
  <v-app :style="image"   :dark="true">      
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
import Cookies from "js-cookie";
import axios from 'axios'

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
  computed:{
    image() {
            return {
              'background-color': '#263238',
              'position': 'relative',
            }
        }
  }
}

</script>
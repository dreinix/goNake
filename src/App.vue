<template>
  <v-app app :style="image">
    <navigation app />
    <v-main app>
      <landing msg="Welcome to Your Vue.js App"/>
    </v-main>
    
  </v-app>
</template>
<v-app id="game"></v-app>
<script>
import Landing from '@/components/landingPage/landing.vue'
import navigation from '@/components/navbar/navbar.vue'
import "@/components/landingPage/landing.css";


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
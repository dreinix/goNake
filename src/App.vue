<template>
  <div id="app" :style="image">
    <landing msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<div id="game"></div>
<script>
import Landing from '@/components/landingPage/landing.vue'
import "@/components/landingPage/landing.css";


export default {
  name: 'app',
  components: {
    Landing
  },
  data(){
    return {
      image: { backgroundImage: `url(${require('@/assets/images/background.jpg')})` },
    }
  }
}

</script>
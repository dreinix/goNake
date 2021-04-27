<template>
  <div class="landing">
    <div id="content" >
      <div id="leaderboard">
      <v-list subheader two-line dark
        dense max-width="80%">
        <v-list-item
          v-for="(score, i) in scores" :key="i">
          
          <v-list-item-content>
            <v-list-item-title>Top #{{i+1}}</v-list-item-title>
            <v-list-item-title >Score: {{score.value}}</v-list-item-title>
            <v-list-item-subtitle>
              By: {{score.user.name}} -- At: {{formatDate(score.date)}}
            </v-list-item-subtitle>
              
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </div>     
        <div id="game">
          <ion-phaser
            v-bind:game.prop='game'
            v-bind:initialize.prop='initialize'
          />
        </div>
      <div/>    
    </div>
  </div>  
</template>
<script>
import Phaser from "phaser";
import {Game} from '@/game/game'
import {Menu} from '@/game/scene/menu'
import {Load} from '@/game/scene/load'
import axios from 'axios'
import auth from '@/utils/apiRequest'
import moment from 'moment'
export default {
  
  name: 'landing',
  items: [],
  reloaded: false,
  props: {
    msg: String,
  },
  data() {
    return {
      image: { backgroundImage: `url(${require('@/assets/images/background.jpg')})` },
      initialize: true,
      game: {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Load,Menu,Game],
        physics:{
          default: 'arcade',
          arcade: {
            gravity:{y:0},
            debug:false
          }
        },
        parent: "game"
      },
      scores:[],
    }
  },
  methods: {
    initializeGame() {
      this.initialize = true;
    }
  },
  methods:{
    formatDate(date){
      return moment(String(date)).add(4, 'hours').format('DD/MM/YYYY hh:mm a')
    }
  },
  mounted(){
    
    try {
      axios
      .get(`http://127.0.0.1:3001/api/scores/top`)
      .then(response => (this.info = response, console.log(response.data),this.scores=response.data))
      .catch(err=>{
        if(!err.status){
          return "Server down"
        } 
      })
    } catch (e) {
      return e;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<template>
  <div class="landing">
    <div @click="getUser">
        <a href="#1" class="btn">Initialize</a>
    </div>
    <div id="content" >
      <div id="leaderboard">
      <v-list>
        <v-list-item
          v-for="(score, i) in scores"
          :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="score.value"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


      </div>     
        <div  id="game">
          <h1>{{ msg }}</h1>
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
/*

      <md-list v-for="score in scores" v-bind:key="score.ID">
        <md-list-item>
        <span class="md-list-item-text"> {{score.value}} - {{score.user.name}} : {{formatDate(score.date)}}</span>
          
        </md-list-item>
      </md-list>
*/
import Phaser from "phaser";
import {Game} from '@/game/game'
import axios from 'axios'
import testing from '@/utils/apiRequest'
import moment from 'moment'
export default {
  
  name: 'landing',
  items: [],
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
        scene: [Game],
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
    getUser(){
      try {
        axios
        .get('http://127.0.0.1:3001/api/users/652619946128146433')
        .then(response => (this.info = response, console.log(response.data)))
        return response;
      } catch (e) {
        return e;
      }
    },
    formatDate(date){
      return moment(String(date)).format('MM/DD/YYYY HH:MM')
    }
  },
  mounted(){
    try {
      axios
      .get(`http://127.0.0.1:3001/api/scores`)
      .then(response => (this.info = response, console.log(response.data),this.scores=response.data))
      return response;
    } catch (e) {
      return e;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


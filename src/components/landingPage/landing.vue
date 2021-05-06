<template>
  <div class="landing">
    <div id="content">
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
import moment from 'moment'
import { getTopScores } from '@/utils/utils';
export default {
  
  name: 'landing',
  items: [],
  reloaded: false,
  props: {
    msg: String,
  },
  data() {
    return {
      initialize: true,
      game: {
        type: Phaser.AUTO,
        width: 1200,
        height: 720,
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
      userD: {},
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
  async mounted(){  
    if(window.location.hash=="#logged") {
      window.location = window.location + '/';
      window.location.reload();
    }
    let response = await getTopScores();
    if(response.data){
      this.scores = response.data
    }
  }
}
</script>


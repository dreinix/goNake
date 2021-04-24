<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  <div @click="initializeGame"  class="flex" >
      <a  href="#1" class="btn">Initialize</a>
    </div>
    <div id="game" style="align-self: center;">
      <ion-phaser
        v-bind:game.prop='game'
        v-bind:initialize.prop='initialize'
      />
    </div>
    
  </div>
  
</template>

<script>
import Phaser from "phaser";
import {Game} from '../game/game'
import snakeImg from '../assets/images/snake.png'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
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
      }
    }
  },
  methods: {
    initializeGame() {
      this.initialize = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

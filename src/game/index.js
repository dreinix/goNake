import {Game } from './game.js'
const config = {
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
    scale:{
        autoCenter: 1
    },
    parent: "game"
}
var game = new Phaser.Game(config)




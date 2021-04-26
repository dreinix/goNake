import {DIRECTORY} from '../directory.js'
export class Menu extends Phaser.Scene{
    constructor(){
        super({
            key: DIRECTORY.SCENES.MENU
        })
    }
    init(data){

    }
    preload(){
        
        
    }
    create(){
        let play = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2 -150,'play').setDepth(0);
        play.setScale(0.4)

        let mp = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2 +100,'MP').setDepth(0);
        mp.setScale(0.07)

        play.setInteractive();

        play.on("pointerup",()=>{
            this.scene.start(DIRECTORY.SCENES.GAME)
        })
    }
} 
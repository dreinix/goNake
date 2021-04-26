import {DIRECTORY} from '../directory.js'
export class Menu extends Phaser.Scene{
    constructor(){
        super({
            key: DIRECTORY.SCENES.MENU
        })
        this.died = false;
    }
    init(data){
        data==="died"? this.died = true:this.died=false
    }
    preload(){
        
        
    }
    create(){
        //setup
        this.gameOverDisplay = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2 - 100,'gameover');
        this.tryagain = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2,'tryagain').setScale(0.8);
        this.yes= this.add.sprite(this.game.renderer.width/2-50,this.game.renderer.height/2 + 50,'yes').setScale(2);
        this.no = this.add.sprite(this.game.renderer.width/2+50,this.game.renderer.height/2+50,'no').setScale(2);
        let play = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2 -150,'play').setDepth(0);
        play.setScale(0.4)
        let mp = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2 +100,'MP').setDepth(0);
        mp.setScale(0.07)

        //hiding
        this.gameOverDisplay.visible = (false);
        this.yes.visible = (false);
        this.no.visible = (false);
        this.tryagain.visible = false;
        play.visible = false;
        mp.visible = false;
        //actions
        if(!this.died){
            play.visible = true;
            mp.visible = true;

            play.setInteractive();
            play.on("pointerup",()=>{
                this.scene.start(DIRECTORY.SCENES.GAME)
            })
        }else{

            this.gameOverDisplay.setVisible(true);
            this.tryagain.setVisible(true)
            this.yes.setVisible(true)
            this.no.setVisible(true)
            //enable button
            this.yes.setInteractive();
            this.no.setInteractive();
            this.yes.on("pointerup",()=>{
                this.died = false;
                this.scene.start(DIRECTORY.SCENES.GAME)
                
            })
            this.no.on("pointerup",()=>{
                this.died = false;
                //this.scene.restart()
                this.scene.stop(DIRECTORY.SCENES.GAME)
                this.scene.start(DIRECTORY.SCENES.MENU,"giveup") 
                
            })
        }
        
    }
} 
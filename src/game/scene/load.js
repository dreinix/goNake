import {DIRECTORY} from '../directory.js'
import snakeimg from '@/assets/images/snake.png'
import gappleimg from '@/assets/images/apple.png'
import rapple from "@/assets/images/redApple.png"
import vWall from "@/assets/images/wall.png"
import playImg from "@/assets/images/play_Logo.png"
import MpImg from "@/assets/images/MP_option.png"
import gameover from '@/assets/images/gameover.png'
import tryagain from '@/assets/images/try_again.png'
import yes from '@/assets/images/yes.png'
import no from '@/assets/images/no.png'
export class Load extends Phaser.Scene{
    constructor(){
        super({
            key: DIRECTORY.SCENES.LOAD
        })
    }
    preload(){
        //
        // preload assets by parcing it as base64 from URI
        //
        this.textures.addBase64('snake', snakeimg);
        this.textures.addBase64('gapple',gappleimg);
        this.textures.addBase64('rapple',rapple);
        this.textures.addBase64('vWall',vWall);
        this.textures.addBase64('gameover',gameover); 
        this.textures.addBase64('play',playImg);
        this.textures.addBase64('MP',MpImg);
        this.textures.addBase64('tryagain',tryagain);
        this.textures.addBase64('yes',yes);
        this.textures.addBase64('no',no);
        this.load.image('snake','@/assets/images/snake.png');  
        this.load.image('gameover','@/assets/images/gameover.png');
        this.load.image('tryagain','@/assets/images/gameover.png');
        //
        //create a loadingbar
        //
        let loadingBar =  this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        //
        // Create a loading efect
        //
        for (let index = 0; index < 100; index++) {
            this.load.image('snake'+index,'@/assets/images/snake.png');  
        }
        this.load.on("progress",(percentage)=>{
            loadingBar.fillRect(0,this.game.renderer.height/2,this.game.renderer.width *percentage,30)
        })       
        
    }
    create(){
        this.scene.start(DIRECTORY.SCENES.MENU,"loaded from load")
    }

} 
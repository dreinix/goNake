var dead = false
import {DIRECTORY} from './directory.js'
/*import snakeimg from '../assets/images/snake.png'
import gappleimg from '../assets/images/apple.png'
import rapple from "../assets/images/redApple.png"
import vWall from "../assets/images/wall.png"
import playImg from "../assets/images/playLogo.png"
import background from "../assets/images/background.jpg"*/
export class Game extends Phaser.Scene{
    constructor(){
        super({
            key: DIRECTORY.SCENES.GAME
        })
        this.speed = 200;
        this.tail = [];
        this.apples = 0;
        this.scoreText = ""
        this.cursors = null
        this.snake = null
        this.rapple = null
        this.gapple = null
    }
    init(){
        this.speed = 200;
        this.tail = [];
        this.apples = 0;
        this.scoreText = ""
        this.cursors = null
        this.snake = null
        this.rapple = null
        this.gapple = null
        this.yes = null
        this.no = null
        this.tryagain = null
        this.gameOverDisplay = null;
    }  
    create () {
        //default world elements
        this.scoreText = this.add.text(10, 10, 'score: 0', { fontSize: '32px', fill: '#ffff' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.body = this.physics.add.group();
        this.neck = this.physics.add.group();
        this.gameOverDisplay = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2 - 100,'gameover');
        this.tryagain = this.add.sprite(this.game.renderer.width/2,this.game.renderer.height/2,'tryagain').setScale(0.8);
        this.yes= this.add.sprite(this.game.renderer.width/2-50,this.game.renderer.height/2 + 50,'yes').setScale(2);
        this.no = this.add.sprite(this.game.renderer.width/2+50,this.game.renderer.height/2+50,'no').setScale(2);
        this.gameOverDisplay.setVisible(false);
        this.yes.setVisible(false);
        this.no.setVisible(false);
        this.tryagain.setVisible(false);
        // Snake creation
        this.snake = this.physics.add.sprite(400, 300, 'snake');
        this.snake.setCollideWorldBounds(true);
        this.snake.setScale(1.2)
        
        this.snake.checkWorldBounds = true;
        
        //variable elements
        this.rapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-100),Phaser.Math.Between(50, this.game.canvas.height-100),'rapple') 
        this.gapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-100),Phaser.Math.Between(50, this.game.canvas.height-100),'gapple')     
    
        //Interactions
        this.physics.add.collider(this.snake, this.body.getChildren(),die, null, this);
        this.physics.add.overlap(this.snake, this.gapple, collectGreenApple, null, this);
        this.physics.add.overlap(this.snake, this.rapple, collectRedApple, null, this);
    }
    
    
    update(){  
        
        if (this.cursors.left.isDown & this.snake.body.velocity.x!=this.speed) {
            this.snake.body.setVelocityY(0);
            this.snake.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown & this.snake.body.velocity.x!=-this.speed) {
            this.snake.body.setVelocityY(0);
            this.snake.body.setVelocityX(this.speed);
        } else if (this.cursors.up.isDown & this.snake.body.velocity.y!=this.speed) {
            this.snake.body.setVelocityY(-this.speed);
            this.snake.body.setVelocityX(0);
        } else if(this.cursors.down.isDown & this.snake.body.velocity.y!=-this.speed){
            this.snake.body.setVelocityX(0);
            this.snake.body.setVelocityY(this.speed);
        } /*
        else{
            console.log("x: "+snake.body.x)
            console.log("y: "+snake.body.y)
            snake.body.setVelocityX(0);
            snake.body.setVelocityY(0);
        }*/
        //Create a "tail" efect
        if(this.neck.getChildren().length>0){      
            Phaser.Actions.ShiftPosition(this.neck.getChildren(), this.snake.x, this.snake.y,1);
        }
        if(this.tail.length>0){
    
            Phaser.Actions.ShiftPosition(this.tail, this.neck.getChildren()[this.neck.getChildren().length-1].x, this.neck.getChildren()[this.neck.getChildren().length-1].y);
        }
        //borders
        if(this.game.canvas.width-9==this.snake.x || this.snake.x ==9 || this.game.canvas.height-9==this.snake.y|| this.snake.y ==9 ){
            dead = true
        }
        if(dead){
            gameOver(this);
        }
    }
}
function die(){
    dead = true
}
function gameOver (game){
    game.gameOverDisplay = game.add.sprite(game.game.renderer.width/2,game.game.renderer.height/2 - 100,'gameover');
    game.gameOverDisplay.setVisible(true);
    game.tryagain.setVisible(true)
    game.yes.setVisible(true)
    game.no.setVisible(true)
    game.yes.setInteractive();
    game.no.setInteractive();
    game.yes.on("pointerup",()=>{
        game.scene.start(DIRECTORY.SCENES.GAME)
    })
    game.no.on("pointerup",()=>{
        game.scene.start(DIRECTORY.SCENES.MENU) 
    })
}

function collectRedApple (snake,rapple)
{   
    rapple.disableBody(true, true);
    let odd = Phaser.Math.Between(0,100)
    if(this.neck.getChildren().length<2){
        console.log("You died because you can't be smaller")
        die()
    }else{
        if(this.body.getChildren().length>2){
            for (let i =0; i<2 ; i++) {
                let removed = this.body.getChildren()[this.body.getChildren().length-1];
                removed.disableBody(true,true)
                this.body.remove(this.body.getChildren().length-1);
            }
        }else if(this.body.getChildren().length>0){
            let count = 0;
            for (let i = 0; i<this.body.getChildren().length-1 ; i++) {
                let removed = this.body.getChildren()[this.body.getChildren().length-1];
                removed.disableBody(true,true)
                this.body.remove(this.body.remove(this.body.getChildren().length-1));
                count++;
            }
            if(count!=2){
                let removed = this.neck.getChildren()[this.neck.getChildren().length-1];
                removed.disableBody(true,true)
                this.neck.remove(this.neck.getChildren()[this.neck.getChildren().length-1]);
            }
        }else{
            for (let i = 0; i<2 ; i++) {
                let removed = this.neck.getChildren()[this.neck.getChildren().length-1];
                removed.disableBody(true,true)
                this.neck.remove(this.neck.getChildren()[this.neck.getChildren().length-1]);
            }
        }
    }
    //
    // 15% chance to generate a redApple when eating
    //
    if(odd<=100){
        this.rapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-50),Phaser.Math.Between(50, this.game.canvas.height-50),'rapple') 
        this.physics.add.overlap(snake, this.rapple, collectRedApple, null, this);
    }  

}

function collectGreenApple (snake, gapple)
{   //
    //Apple reaction
    //
    //collectRedApple()
    this.gapple.disableBody(true, true);
    this.apples += 1;
    this.scoreText.setText('apples: ' + this.apples);

    this.gapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width+1),Phaser.Math.Between(50, this.game.canvas.height+1),'gapple')     
    this.physics.add.overlap(snake, this.gapple, collectGreenApple, null, this);
    //
    //Add tail elements
    //
    this.tail = this.body.getChildren();
    if(this.neck.getChildren().length>(snake.width/this.speed)*100){ 
        this.body.create(
            this.neck.getChildren()[this.neck.getChildren().length-1].x, 
                this.neck.getChildren()[this.neck.getChildren().length-1].y, 'snake');                        
    }
    else{ 
        this.neck.create(snake.x, snake.y, 'snake');
    }
    //
    // 15% chance to generate a redApple when eating
    //
    let odd = Phaser.Math.Between(0,100)
    if(odd<=15){
        rapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-50),Phaser.Math.Between(50, this.game.canvas.height-50),'rapple') 
        this.physics.add.overlap(snake, rapple, collectRedApple, null, this);
    }
}
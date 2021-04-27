var dead = false
export var score = 0;
import {DIRECTORY} from './directory.js'
import axios from 'axios'
export class Game extends Phaser.Scene{
    constructor(){
        super({
            key: DIRECTORY.SCENES.GAME
        })
    }
    init(){
        //set everything to 0
        this.speed = 250;
        this.tail = [];
        this.apples = 0;
        this.scoreText = ""
        this.cursors = null
        this.snake = null
        this.rapple = null
        this.gapple = null
        this.walls = false;

    }  
    create () {
        //default world elements
        this.scoreText = this.add.text(10, 10, 'score: 0', { fontSize: '32px', fill: '#ffff' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.body = this.physics.add.group();
        this.neck = this.physics.add.group();
        // Snake creation
        this.snake = this.physics.add.sprite(400, 300, 'snake');
        this.snake.setCollideWorldBounds(true);
        this.snake.setScale(1.2)
        
        this.snake.checkWorldBounds = true;
        
        //variable elements
        this.rapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-100),Phaser.Math.Between(50, this.game.canvas.height-100),'rapple') 
        this.gapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-100),Phaser.Math.Between(50, this.game.canvas.height-100),'gapple')     
        
        //Interactions
        this.physics.add.overlap(this.snake, this.body.getChildren(),die, null, this);
        this.physics.add.overlap(this.snake, this.gapple, collectGreenApple, null, this);
        this.physics.add.overlap(this.snake, this.rapple, collectRedApple, null, this);
        this.physics.add.overlap(this.snake, this.walls, die, null, this);
        this.physics.add.overlap(this.body, this.walls, die, null, this);
    }
    
    
    update(){  
        // handle direction change
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
        }
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
    //reset dead and launche try again menu
    dead = false;
    try {
        axios
            .post(`http://127.0.0.1:3001/api/scores/`,{value:game.apples},{withCredentials: true})
            .catch(err=>{
                if(!err.status){
                    console.log(err)
                } 
            })
    } catch (error) {
        console.log(error)
    }
    game.scene.pause()
    game.scene.bringToTop(DIRECTORY.SCENES.MENU)
    game.scene.launch(DIRECTORY.SCENES.MENU,"died")
}

function collectRedApple (snake,rapple)
{   
    rapple.disableBody(true, true);
    let odd = Phaser.Math.Between(0,100)
    //
    // Reduce the tail/body size by 2 for every apple
    //
    if(this.neck.getChildren().length<2){
        die()
    }else{
        if(this.body.getChildren().length>=2){
            for (let i =0; i<2 ; i++) {
                let removed = this.body.getChildren()[this.body.getChildren().length-1];
                removed.disableBody(true,true)      
                this.body.remove(this.body.getChildren()[this.body.getChildren().length-1]);
                         
            }
        }else if(this.body.getChildren().length>0){
                let removed = this.body.getChildren()[this.body.getChildren().length-1];
                removed.disableBody(true,true)
                this.body.remove(this.body.getChildren()[this.body.getChildren().length-1]);
                
                removed = this.neck.getChildren()[this.neck.getChildren().length-1];
                removed.disableBody(true,true)
                this.neck.remove(this.neck.getChildren()[this.neck.getChildren().length-1]);
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
    if(odd<=15){
        this.rapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-50),Phaser.Math.Between(50, this.game.canvas.height-50),'rapple') 
        this.physics.add.overlap(snake, this.rapple, collectRedApple, null, this);
    }  

}

function collectGreenApple (snake)
{   //
    //Apple reaction
    //
    //collectRedApple()
    this.gapple.disableBody(true, true);
    this.apples += 1;
    this.scoreText.setText('score: ' + this.apples);
    this.gapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-50),Phaser.Math.Between(50, this.game.canvas.height-50),'gapple')     
    this.physics.add.overlap(snake, this.gapple, collectGreenApple, null, this);
    //
    //Add tail elements
    //
    this.tail = this.body.getChildren();
    console.log((snake.width/this.speed)*100)
    if(this.neck.getChildren().length>(snake.width/this.speed)*100){ 
        this.body.create(
            this.neck.getChildren()[this.neck.getChildren().length-1].x, 
                this.neck.getChildren()[this.neck.getChildren().length-1].y, 'snake');                        
    }
    else{ 
        this.neck.create(snake.x, snake.y, 'snake');
    }
    //
    // Every 10 points generate a wall in a random position
    //
    let vodd = Phaser.Math.Between(0,100)
    if(this.apples%10==0){
        this.walls = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-100),Phaser.Math.Between(50, this.game.canvas.height-100),'vWall')
        vodd<50? this.walls.rotation= 1.575: this.walls.rotation=0
        this.physics.add.overlap(this.snake, this.walls, die, null, this);
        this.physics.add.overlap(this.body, this.walls, die, null, this);
        this.speed+=this.speed*0.1
    }
    //
    // 15% chance to generate a redApple when eating
    //
    let odd = Phaser.Math.Between(0,100)
    if(odd<=15){
        this.rapple = this.physics.add.sprite(Phaser.Math.Between(50, this.game.canvas.width-50),Phaser.Math.Between(50, this.game.canvas.height-50),'rapple') 
        this.physics.add.overlap(snake, this.rapple, collectRedApple, null, this);
    }
}
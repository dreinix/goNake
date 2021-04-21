const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload:preload,
        create:create,
        update:update,
    },
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

function preload () {
    
    //this.game.scale.autoCenter = 1;
    this.load.image('snake',"/assets/images/snake.png");
    this.load.image('gapple',"/assets/images/apple.png");
    this.load.image('rapple',"/assets/images/redApple.png");
    this.load.image('vWall',"/assets/images/wall.png");
    this.load.image('neck',"/assets/images/snake.png"); 
    this.load.image('background',"/assets/images/background.jpg"); 
    //this.game.canvas={ margin : 800}
    //game.stage.scale.pageAlignVeritcally = true;
}
var apples = 0
var tail = [];

function create () {
    
    //default world elements
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffff' });
    cursors = this.input.keyboard.createCursorKeys();
    this.group = this.physics.add.group();
    this.game.scale.refresh()
    // Snake creation
    snake = this.physics.add.sprite(400, 300, 'snake');
    //snake.setBounce(0.2);
    snake.setCollideWorldBounds(true);
    snake.setScale(1.2)

    snake.checkWorldBounds = true;
    
    //variable elements
    var Rapple = this.physics.add.sprite("250","300",'rapple') 
    Rapple.setScale(0.1,0.1)

    Gapple = this.physics.add.sprite(Phaser.Math.Between(0, this.game.canvas.width+1),Phaser.Math.Between(0, this.game.canvas.height+1),'gapple')     

    //Interactions
    this.physics.add.overlap(snake, this.group,gameOver, null, this);
    this.physics.add.overlap(snake, Gapple, collectGreenApple, null, this);
    this.physics.add.overlap(snake, Rapple, collectRedApple, null, this);  
    this.physics.add.collider(snake,this.physics.world,gameOver,null,this);
}

function gameOver (game){
    console.log("GAME OVER MA NIGGA")
    game.scene.pause();
}

function collectGreenApple (snake, apple)
{   //
    //Apple reaction
    //
    apple.disableBody(true, true);
    apples += 1;
    scoreText.setText('apples: ' + apples);

    Gapple = this.physics.add.sprite(Phaser.Math.Between(0, this.game.canvas.width+1),Phaser.Math.Between(0, this.game.canvas.height+1),'gapple')     
    this.physics.add.overlap(snake, Gapple, collectGreenApple, null, this);
    
    //
    //Tail efect
    //
    //Spawn behind
    var spawnOffsetX = 0;
    var spawnOffsetY = 0;
    var amount = 20
    if (snake.body.velocity.x > 0) {
      spawnOffsetX = amount
    }
    if (snake.body.velocity.x < 0) {
      spawnOffsetX = -amount
    }
    if (snake.body.velocity.Y > 0) {
      spawnOffsetY = amount
    }
    if (snake.body.velocity.y < 0) {
      spawnOffsetY = -amount
    }
    tail = this.group.getChildren();
    if(this.group.getChildren().length>0){
        this.group.create(
            tail[tail.length-1].x + spawnOffsetX, 
                tail[tail.length-1].y + spawnOffsetY, 'snake');
    }else if(this.neck){           
        this.neck.create(
            this.neck.getChildren()[this.neck.getChildren().length-1].x + spawnOffsetX, 
                this.neck.getChildren()[this.neck.getChildren().length-1].y + spawnOffsetY, 'snake');
        if(this.neck.getChildren().length>4){
            this.group.create(
                this.neck.getChildren()[this.neck.getChildren().length-1].x + spawnOffsetX, 
                    this.neck.getChildren()[this.neck.getChildren().length-1].y + spawnOffsetY, 'snake');
        }
    }else{
        this.neck = this.physics.add.group();
        this.neck.create(snake.x + spawnOffsetX, snake.y + spawnOffsetY, 'neck');
    }
}

function collectRedApple (snake,rapple)
{   
    rapple.disableBody(true, true);
    var Rapple = this.add.sprite(Phaser.Math.Between(0, this.game.canvas.width+1),Phaser.Math.Between(0, this.game.canvas.height+1),'rapple') 
    Rapple.setScale(0.1,0.1)
    this.physics.add.overlap(snake, Rapple, collectRedApple, null, this);
    odd = Phaser.Math.Between(0,100)
    if(odd>=0 && odd<=5){
        console.log("weeeeeeeey")
    }  

}

function update(){
    
    speed = 400;
    
    if (cursors.left.isDown & snake.body.velocity.x!=speed) {
        snake.body.setVelocityY(0);
        snake.body.setVelocityX(-speed);
    } else if (cursors.right.isDown & snake.body.velocity.x!=-speed) {
        snake.body.setVelocityY(0);
        snake.body.setVelocityX(speed);
    } else if (cursors.up.isDown & snake.body.velocity.y!=speed) {
        snake.body.setVelocityY(-speed);
        snake.body.setVelocityX(0);
    } else if(cursors.down.isDown & snake.body.velocity.y!=-speed){
        snake.body.setVelocityX(0);
        snake.body.setVelocityY(speed);
    }  
    if(this.neck){
        Phaser.Actions.ShiftPosition(this.neck.getChildren(), snake.x, snake.y,0);
    }
    if(tail.length>0){
        Phaser.Actions.ShiftPosition(tail, this.neck.getChildren()[0].x, this.neck.getChildren()[0].y,0);
    }
    if(this.game.canvas.width-9==snake.x || snake.x ==9 || this.game.canvas.height-9==snake.y|| snake.y ==9 ){
        gameOver(this);
    }
}


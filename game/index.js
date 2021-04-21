const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload:preload,
        create:create
    },
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y:400},
            debug:false
        }
    }
}

var game = new Phaser.Game(config)

function preload () {
    
this.load.image('rimuru',"/assets/images/rimuru_drip.png");

}

function create () {
    this.add.image("400","300",'rimuru')
}

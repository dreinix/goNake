export class Game extends Phaser.Scene{

    constructor(){
        super({key: 'game'});
    }

    preload() {
        this.load.image('rimuru',"/assets/images/rimuru_drip.png");
      }
      
    create() {
        this.add.image("0","0",'rimuru')
    }
}



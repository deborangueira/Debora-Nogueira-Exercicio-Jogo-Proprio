class jogo extends Phaser.Scene {

    constructor() {
        super({
            key: 'jogo',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: true 
                }
            }
        });
    } 

    preload() {
        // Carregar recursos

        this.load.image('bg', 'Assets/bg_c1.png');
        this.load.image('fire', 'Assets/fire.png');
        this.load.image('flower', 'Assets/flower.png');
        this.load.image('tronco', 'Assets/tronco.png');
        this.load.image('riacho', 'Assets/Riacho.png');
        this.load.image('personagem', 'Assets/bambi.png',{ frameWidth: 32, frameHeight: 48 });
    }

    create() {

        //BACKGROUND
        this.add.image(larguraJogo/2,alturaJogo/2,'bg');

        //BAMBI
        var bambi = this.physics.add.sprite(100,0,'personagem');
        bambi.setColliderWorldBounds(true);
    


    }

    update() {
        // Lógica de atualização da cena
    }
}



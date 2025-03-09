class gameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload (){
    
        this.load.image('bgGO','Assets/bg_gameOver.jpg');
    
    }
    
    create(){

        this.add.image(larguraJogo/2,alturaJogo/2,'bgGO');
    
        // Se o jogador pressionar a tecla 'R', reinicia o jogo
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('jogo'); // Volta para a cena de jogo
        });
    
        }
    
    }
    
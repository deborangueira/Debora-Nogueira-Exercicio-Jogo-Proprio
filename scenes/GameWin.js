class gameWin extends Phaser.Scene {
    constructor() {
        super({ key: 'gameWin' });
    }

    preload (){

        this.load.image('bgGW','Assets/bg_gameWin.jpg');
        this.load.image('flower', 'Assets/flower.png'); 

    }

    create(){
    
        this.add.image(larguraJogo/2,alturaJogo/2,'bgGW');
        this.cameras.main.fadeIn(1000);

        // Sistema de partículas para as flores
        const particles = this.add.particles('flower');

        // Se o jogador pressionar a tecla 'M', reinicia o jogo
        this.input.keyboard.on('keydown-M', () => {
            this.scene.start('menu'); // Volta para a cena de jogo
        });

    }

}

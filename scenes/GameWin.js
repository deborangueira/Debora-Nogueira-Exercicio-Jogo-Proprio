class gameWin extends Phaser.Scene {
    constructor() {
        super({ key: 'gameWin' });
    }

    preload (){

        this.load.image('bgGW','Assets/bg_gameWin.jpg');

    }

    create(){
    
        this.add.image(larguraJogo/2,alturaJogo/2,'bgGW');

        // Se o jogador pressionar a tecla 'R', reinicia o jogo
        this.input.keyboard.on('keydown-M', () => {
            this.scene.start('menu'); // Volta para a cena de jogo
        });

    }

}

class gameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    create() {
        this.add.text(200, 200, 'Game Over', { fontSize: '48px', fill: '#FF0000' });
        this.add.text(150, 300, 'Pressione R para reiniciar', { fontSize: '32px', fill: '#FFFFFF' });

        // Se o jogador pressionar a tecla 'R', reinicia o jogo
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('jogo'); // Volta para a cena de jogo
        });
    }
}

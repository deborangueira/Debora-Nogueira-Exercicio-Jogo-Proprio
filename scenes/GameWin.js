class gameWin extends Phaser.Scene {
    constructor() {
        super({ key: 'gameWin' });
    }

    create() {
        this.add.text(200, 200, 'Game Win!!', { fontSize: '48px', fill: '#FF0000' });
        this.add.text(150, 300, 'Pressione M para ir para o menu', { fontSize: '32px', fill: '#FFFFFF' });

        // Se o jogador pressionar a tecla 'R', reinicia o jogo
        this.input.keyboard.on('keydown-M', () => {
            this.scene.start('menu'); // Volta para a cena de jogo
        });
    }
}

class welcome extends Phaser.Scene {
    constructor() {
        super({ key: 'welcome' });
    }

    preload() {
        // Carregar recursos
        this.load.image('background','Assets/bg-green.png');
        this.load.image('botaojogar','Assets/botaoplay.png');
        this.load.audio('theme',[
            'Assets/audio/soundtrack.m4a'
        ]);
    }

    create() {
        // Configuração inicial da cena

        this.add.image(larguraJogo/2,alturaJogo/2,'background');
        this.add.image(larguraJogo/2,alturaJogo/2,'botaojogar');
        const music = this.sound.add('theme');
        music.play();
        this.sound.pauseOnBlur = true;

    }

    update() {
        // Lógica de atualização da cena
    }
}
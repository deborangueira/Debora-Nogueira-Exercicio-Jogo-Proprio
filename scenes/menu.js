class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    preload() {
        this.load.image('background','Assets/bg_welcome.png');
        this.load.image('botaojogar','Assets/bt_play.png');
        this.load.image('botaotutorial','Assets/bt_tutorial.png');
        this.load.image('botaocreditos','Assets/bt_credits.png');
        this.load.audio('theme',[
            'Assets/audio/soundtrack.m4a'
        ]);
        this.load.audio('hoverSound',[
            'Assets/audio/sd_click.m4a'
        ]);
    }

    create() {

        //BACKGROUND
        this.add.image(larguraJogo/2,alturaJogo/2,'background');
        this.cameras.main.fadeIn(1000);  // faz a cena aparecer suavemente

        //MÚSICA
        const music = this.sound.add('theme');
        music.setVolume(0.3);

        //BOTÕES: adicionando e ativando-os
        let botao1 = this.add.image(larguraJogo/2 +31,alturaJogo/4 + 100, 'botaojogar').setInteractive();
        botao1.on('pointerdown',() => {
            this.hoverSound = this.sound.add('hoverSound');
            this.hoverSound.play({seek: 0.006, volume: 0.3 });
            this.scene.start('jogo');
            music.play();
         });
        

        let botao2 = this.add.image(larguraJogo/2 + 60,alturaJogo/4 + 200, 'botaotutorial').setInteractive({ useHandCursor: true });
        botao2.on('pointerdown',() => {
            this.hoverSound = this.sound.add('hoverSound');
            this.hoverSound.play({seek: 0.006, volume: 0.3 });
            this.scene.start('tutorial')
        });
                
       let botao3 = this.add.image(larguraJogo/2 + 60,alturaJogo/4 + 300, 'botaocreditos').setInteractive({ useHandCursor: true });
        botao3.on('pointerdown',() => {
            this.hoverSound = this.sound.add('hoverSound');
            this.hoverSound.play({seek: 0.006, volume: 0.3 });
            this.scene.start('creditos')
        });

         // Efeito de hover para os botões
         const addHoverEffect = (button) => {
            button.on('pointerover', () => 
                button.setScale(1.2));
            button.on('pointerout', () => 
                button.setScale(1));
        };

        addHoverEffect(botao1);
        addHoverEffect(botao2);
        addHoverEffect(botao3);

    }
    
        
}

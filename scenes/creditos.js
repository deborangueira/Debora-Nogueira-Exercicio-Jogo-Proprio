//definindo a classe Tutorial
class creditos extends Phaser.Scene {
	constructor() {
		super({ key: 'creditos' })  //chave da classem - útil para referenciação
	}

    preload () {
        
        this.load.image('voltar', 'Assets/bt_return.png');
        this.load.image('bgTutorial', 'Assets/bg_tutorial.png');
    }

	create() {

        this.add.image(larguraJogo/2,alturaJogo/2,'bgTutorial');
    
        //BOTÃO VOLTAR: adicionando e ativando-o
        var botaoVoltar = this.add.image(170, 700, 'voltar');
        botaoVoltar.setInteractive()
            .on('pointerdown', () => {
            this.scene.stop('tutorial')
            this.scene.start('menu');
        });
         // Efeito de hover para o botão voltar
         const addHoverEffect = (button) => {
            button.on('pointerover', () => button.setScale(1.2));
            button.on('pointerout', () => button.setScale(1));
        };
        addHoverEffect(botaoVoltar);
    }
}
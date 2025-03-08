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

    init() {
        this.bambi;
        this.teclado;
        this.ground;

    }


    preload() {
        // Carregar recursos

        this.load.image('bg', 'Assets/bg_c1.png');
        this.load.image('ground','Assets/ground1.png')
        this.load.image('fire', 'Assets/fire.png');
        this.load.image('flower', 'Assets/flower.png');
        this.load.image('tronco', 'Assets/tronco.png');
        this.load.image('riacho', 'Assets/Riacho.png');
        this.load.image('bambi', 'Assets/bambi.png',{ frameWidth: 32, frameHeight: 48 });
    }

    create() {

        //BACKGROUND
        this.add.image(larguraJogo/2,alturaJogo/2,'bg');

        //Chão
        this.ground = this.physics.add.staticGroup();
        this.ground.create(600, alturaJogo - 50, 'ground').setScale(0.8).refreshBody();

        //BAMBI
        this.bambi = this.physics.add.sprite(90, 540, 'bambi').setScale(0.5);
        this.bambi.setCollideWorldBounds(true); // impede que ele saia da tela

         // Colisão entre o bambi e o chão
        this.physics.add.collider(this.bambi, this.ground);
   
        // Configurando o teclado
        this.teclado = this.input.keyboard.createCursorKeys();

    }

    update() {

        // Movimenta para a esquerda
        if (this.teclado.left.isDown) {
            this.bambi.setVelocityX(-300);
            this.bambi.setFlipX(true);
        } 
        // Movimenta para a direita
        else if (this.teclado.right.isDown) {
            this.bambi.setVelocityX(300);
            this.bambi.setFlipX(false);
        } 
        // Parado se nenhuma tecla for pressionada
        else {
            this.bambi.setVelocityX(0);
        }

        // Pulo apenas se estiver no chão
        if (this.teclado.up.isDown && this.bambi.body.touching.down) {
            this.bambi.setVelocityY(-330);
        }

    }
}



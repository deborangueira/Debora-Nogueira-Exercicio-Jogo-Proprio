class jogo extends Phaser.Scene {

    constructor() {
        super({
            key: 'jogo',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 },
                    debug: true 
                }
            }
        });
    } 

    init() {
        this.bambi;
        this.teclado;
        this.ground;
        this.flor;
        this.particula;
        this.riacho;
        this.placar;
        this.pontuacao = 0;
        this.fogo;
        this.temporizador;
        this.tempoInicio = 60;

    }


    preload() {
        // Carregar recursos

        this.load.image('bg', 'Assets/bg_c1.png');
        this.load.image('ground','Assets/ground1.png')
        this.load.image('flower', 'Assets/flower.png');
        this.load.image('particula','Assets/particle.png')
        this.load.image('riacho', 'Assets/Riacho.png');
        this.load.image('fire', 'Assets/fire.png');
        this.load.image('bambi', 'Assets/bambi.png',{ frameWidth: 32, frameHeight: 48 });
    }

    create() {

        // TECLADO
        this.teclado = this.input.keyboard.createCursorKeys();

        //BACKGROUND
        this.add.image(larguraJogo/2,alturaJogo/2,'bg');
        
        //RIACHO
        this.riacho = this.physics.add.staticGroup();
        this.riacho.create(750, alturaJogo - 50, 'riacho').setScale(1.2).refreshBody();

        //CHÃO
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, alturaJogo - 50, 'ground').setScale(0.8).refreshBody();
        this.ground.create(1500, alturaJogo - 50, 'ground').setScale(0.8).refreshBody();

        //BAMBI
        this.bambi = this.physics.add.sprite(90, 540, 'bambi').setScale(0.5);
        this.bambi.setCollideWorldBounds(true); // impede que ele saia da tela

        //FLORES
        this.flor = this.physics.add.sprite(300,500,'flower').setScale(0.2);
        this.flor.setBounce(0.7);
        this.flor.setCircle(130,130,130);

        //FOGO
        this.fogo = this.physics.add.sprite(1200,500,'fire').setScale(0.15);
        this.flor.setBounce(0.7);
        this.flor.setCircle(130,130,130);

        //COLISÕES
        this.physics.add.collider(this.bambi, this.ground); //entre o bambi e o chão
        this.physics.add.collider(this.flor, this.ground); //entre a flor e o chão
        this.physics.add.collider(this.fogo, this.ground); //entre o fogo e o chão
        this.physics.add.collider(this.bambi,this.riacho);

        //INTERAÇÕES
        this.physics.add.overlap(this.bambi,this.flor, () => {
            this.flor.setVisible(false).destroy(); // Deixa a flor invisivel e a remove completamente
            this.pontuacao +=1;
            this.placar.setText('Flores:' + this.pontuacao);
        });

        this.physics.add.overlap(this.bambi,this.fogo, () => {
            this.fogo.setVisible(false).destroy(); // Deixa a flor invisivel e a remove completamente
            this.pontuacao -=1;
            this.placar.setText('Flores:' + this.pontuacao);
        });

        // PLACAR
        this.placar = this.add.text(50, 50, 'Flores:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});

        // TIMER
        this.temporizador = this.add.text(50, 100, 'Tempo: 60', {fontSize:'45px', fill:'#495613'});
           
        this.timeEvent = this.time.addEvent({
            delay: 1000, //intervalo de tempo para atualizar a funçãqo
            callback: this.updateTimer, //função iniciada a cada intervalo
            callbackScope: this, //escopo da função de callback
            loop: true //ocorre continuamente
        });


        //EFEITO ESPECIAL 
        this.particula = this.add.particles('particula');

        this.physics.add.overlap(this.bambi, this.flor, (bambi, flor) => {
        const emitter = this.particula.createEmitter({// Criar explosão de partículas
            x: flor.x,
            y: flor.y,
            speed: { min: 0, max: 0 },
            angle: { min: 0, max: 0 },
            scale: { start: 0.3, end: 0.5 },
            lifespan: 200,
            quantity: 5
        });

        // Para as partículas depois de um tempo
        this.time.delayedCall(200, () => {
            emitter.stop();
        });


    });

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

        this.temporizador.setText('Tempo: ' + this.tempoInicio);

        if (this.tempoInicio <= 0) {
            // Adicione a lógica para o que acontece quando o tempo acaba (exemplo, terminar o jogo)
            this.timeEvent.remove();
        }
    }
    // Função que atualiza o temporizador
    updateTimer() {
        this.tempoInicio--; // diminui o tempo em 1
        this.temporizador.setText('Tempo: ' + this.tempoInicio);

        if (this.tempoInicio <= 0) { // Lógica quando o tempo acabar, como terminar o jogo
            this.timeEvent.remove(); // Remove o evento do temporizador
            this.scene.start('gameOver'); // Redireciona para a cena de "Game Over"
     
        }
    }
}



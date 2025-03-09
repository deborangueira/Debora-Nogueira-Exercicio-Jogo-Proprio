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
        this.flores = [];
        this.riacho;
        this.placar;
        this.pontuacao = 0;
        this.temporizador;
        this.tempoInicio = 30;
        this.petala;

    }


    preload() {

        this.load.image('bg', 'Assets/bg_c1.png');
        this.load.image('ground','Assets/ground1.png')
        this.load.image('flower', 'Assets/flower.png');
        this.load.image('particle','Assets/particle.png')
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

        const coordenadasFlores = [
            { x: 300, y: 500 },
            { x: 620, y: 450 },
            { x: 900, y: 400 },
            { x: 1000, y: 350 },
            { x: 1500, y: 300 },
        ];

        this.flores = this.physics.add.group({ 
            bounceY: 0.7,
            allowGravity: true 
        });

        coordenadasFlores.forEach(coord => {
            let flor = this.physics.add.sprite(coord.x, coord.y, 'flower').setScale(0.2);
            flor.setBounce(0.7);
            flor.setCircle(130, 130, 130);
            this.flores.add(flor);
        });

        //FOGO

        const coordenadasFogos = [
            { x: 538, y: 500 },
            { x: 1130, y: 500 },
        ];

        this.fogos = this.physics.add.group();
        coordenadasFogos.forEach(coord => {
            let fogo = this.physics.add.sprite(coord.x, coord.y, 'fire').setScale(0.17);
            this.fogos.add(fogo);
        });

        //COLISÕES
        this.physics.add.collider(this.bambi, this.ground); //entre o bambi e o chão
        this.physics.add.collider(this.flores, this.ground); //entre a flor e o chão
        this.physics.add.collider(this.fogos, this.ground); //entre o fogo e o chão
        this.physics.add.collider(this.bambi,this.riacho);

        // PLACAR
        this.placar = this.add.text(50, 50, 'Flores:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});

        //placar: FOGO-BAMBI
        this.fogos.children.iterate(fogo => {
            this.physics.add.overlap(this.bambi, fogo, () => {
                fogo.setVisible(false).destroy(); // Deixa a flor invisível e a remove
                this.pontuacao -= 1;
                this.placar.setText('Flores: ' + this.pontuacao);
            });
        });

        //placar: FLORES-BAMBI
        this.flores.children.iterate(flor => {
            this.physics.add.overlap(this.bambi, flor, () => {
            
                // Efeito de partículas na posição da flor
                this.emissorDeParticulas.setPosition(flor.x, flor.y); // Ajusta a posição para onde a flor está
                this.emissorDeParticulas.explode(10, flor.x, flor.y); // Explode 20 partículas na posição da flor

                flor.setVisible(false).destroy(); // Deixa a flor invisível e a remove
                
                this.pontuacao += 1;
                this.placar.setText('Flores: ' + this.pontuacao);
            });
        });

        //EFEITO ESPECIAL
        // Sistema de partículas para o efeito de flores
        this.particulas = this.add.particles('particle');

        // Criar o emissor de partículas
        this.emissorDeParticulas = this.particulas.createEmitter({
            x: -100, // Posição inicial X do emissor
            y: -100, 
            speed: 250,
            lifespan: 300, // tempo de vida das partículas
            quantity: 1, // quantidade de partículas
            alpha:{ start:0.8, end: 0},
            scale: { start: 0.05, end: 0.07 },
        });

        // TIMER
        this.temporizador = this.add.text(50, 100, 'Tempo: 60', {fontSize:'45px', fill:'#495613'});
           
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true //ocorre continuamente
        });

        // GAME OVER se tocar no riacho
        this.physics.add.overlap(this.bambi, this.riacho, () => {
            this.scene.start('gameOver'); // Redireciona para a cena de "Game Over"
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
            this.timeEvent.remove();
        }

    }
    // Função que atualiza o temporizador
    updateTimer() {
        this.tempoInicio--; // diminui o tempo em 1
        this.temporizador.setText('Tempo: ' + this.tempoInicio);

        // Verifica se a pontuação chegou a 7
        if (this.pontuacao == 4) {
            this.timeEvent.remove(); // Remove o evento do temporizador
            this.scene.start('gameWin');
        }

        if (this.tempoInicio <= 0) { // Lógica quando o tempo acabar, como terminar o jogo
            this.timeEvent.remove(); // Remove o evento do temporizador
            this.scene.start('gameOver'); // Redireciona para a cena de "Game Over"
        }
    }


}



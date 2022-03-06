/** @type {HTMLCanvasElement} */

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    const CANVAS_WIDTH = canvas.width = 1400;
    const CANVAS_HEIGHT = canvas.height = 720;

    // variaveis para os calculos de movimento
    let forcaDeAtritoMax;
    let miEstatico;
    let massa;
    let gravidade;
    let aceleracao;

    let forcaNormal
    let coeficienteAtrito = 0.3; // coeficiente de atrito do concreto

    // declaração das imagens
    const backgroundImage = new Image();
    backgroundImage.src = '../IMG/jupiter/background.png';
    
    const towerImage = new Image();
    towerImage.src = '../IMG/jupiter/tower.png';
    
    const floorImage = new Image();
    floorImage.src = '../IMG/jupiter/floor.png';

    const layerImage = new Image();
    layerImage.src = '../IMG/jupiter/layer.png';

    const robotImage = new Image();
    robotImage.src = '../IMG/robot_player.png';

    const boxImage = new Image();
    boxImage.src = '../IMG/wooden_box.png';

    // funções

    let gameSpeed = 0;
    let atrito = 0;

    // função responsável por pegar o valor da força aplicada, através do input
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function(e){
        gameSpeed = e.target.value;
        console.log(gameSpeed);
        showGameSpeed.innerHTML = e.target.value;
    });

    // função responsável por pegar o valor do atrito, através do input
    const sliderAtrito = document.getElementById('sliderAtrito');
    sliderAtrito.value = atrito;
    const showAtrito = document.getElementById('showAtrito');
    showAtrito.innerHTML = atrito;
    sliderAtrito.addEventListener('change', function(e){
        atrito = e.target.value;
        console.log(atrito);
        showAtrito.innerHTML = e.target.value;
    });

    // funções para os cálculos de física
    // OBS: ainda não estao corretas, nem feitas...
    function calculoForcaNormal(){

    }
    
    function calculandoAtrito(forcaNormal, coeficienteAtrito){
        forcaDeAtritoMax = forcaNormal * coeficienteAtrito;
        
        return forcaDeAtritoMax;
    }

    function calculandoAceleracao(){
        // aceleracao = FORÇA_RESULTANTE / massa;
        // if(FORÇA_RESULTANTE > forcaDeAtritoMax){
        //     gameSpeed = aceleracao;
        // }else{
        //     gameSpeed -= 0;
        // }

        forcaDeAtritoMax = calculandoAtrito(50, 0.1);

        gameSpeed = forcaDeAtritoMax;
        
        return gameSpeed;
    }

    class InputHandler{
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e =>{
                if((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1){
                        this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e =>{
                if( e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'){
                        this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    class Background{
        constructor(image, speedModifier){
            this.image = image;
            this.width = CANVAS_WIDTH;
            this.height = CANVAS_HEIGHT;
            this.x = 0;
            this.x2 = this.width;
            this.y = 0;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){
            this.speed = gameSpeed * this.speedModifier - atrito;

            if(this.x <= -this.width){
                this.x = this.width + this.x2 - this.speed;
            }
            if(this.x2 <= -this.width){
                this.x2 = this.width + this.x - this.speed;
            }
            this.x = Math.floor(this.x - this.speed);
            this.x2 = Math.floor(this.x2 - this.speed)
        }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
    }

    class Layer{
        constructor(image){
            this.image = image;
            this.width = CANVAS_WIDTH;
            this.height = CANVAS_HEIGHT;
            this.x = 0;
            this.y = 0;
        }
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    
    class Box{
        constructor(image){
            this.width = 150;
            this.height = 150;
            this.x = CANVAS_WIDTH/2;
            this.y = 305;
            this.image = image;
        }   
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } 
    }
    
    class Robot{
        constructor(image){
            this.width = 217;
            this.height = 200;
            this.x = CANVAS_WIDTH / 2 - this.width;
            this.y = CANVAS_HEIGHT - 450;
            this.image = image;
            this.Framex = 0;
            this.Framey= 0;
            this.speed = 0;
            this.vy =0;
            this.weight = 1;
            this.tempo = 0;
        }
        draw(context){
            ctx.fillStyle = 'transparent';
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }


    const input = new InputHandler();
    
    const background = new Background(backgroundImage, 0.01);
    const tower = new Background(towerImage, 0.4);
    const floor = new Background(floorImage, 1);
    const layer = new Layer(layerImage);
    const box = new Box(boxImage);
    const robot = new Robot(robotImage);

    const gameBackground = [background, tower, floor];


    function init(){
        background();
    }



    function animate(){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        layer.draw();
        gameBackground.forEach(object => {
            object.update();
            object.draw();
        });
        box.draw();
        robot.draw();
        requestAnimationFrame(animate);
        
    }   
    animate();
    init();

/*

function animate(){
    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS); 
    
    
    
    requestAnimationFrame(animate);
};
    
//     const LARGURA_SPRITE = 64;
//     const ALTURA_SPRITE = 64;
//     const sprite = new Image();
//     sprite.src = '../IMG/PC Computer - RPG Maker MV - Character 05 Battle.png';
 
//     function animate(){
//     ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
//     ctx.drawImage(sprite, contadorDeFrames * LARGURA_SPRITE, 0, LARGURA_SPRITE, ALTURA_SPRITE, 0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
//     if(gameFrame % staggerFrames == 0){
//         if(contadorDeFrames < 5 ) contadorDeFrames++;
//         else contadorDeFrames = 0;
//     }
//     gameFrame++;
//     requestAnimationFrame(animate);
// }

*/
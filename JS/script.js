/** @type {HTMLCanvasElement} */

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    const CANVAS_WIDTH = canvas.width = 1400;
    const CANVAS_HEIGHT = canvas.height = 720;
    
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



    let gameSpeed = 5;
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
            this.width = 100;
            this.height = 100;
            this.x = CANVAS_WIDTH/2;
            this.y = 355;
            this.image = image;
        }   
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } 
    }
    // class Robot{
    //     constructor(gameWidth, gameHeight){
    //         this.gameWidth = gameWidth;
    //         this.gameHeight = gameHeight;
    //         this.width = 100;
    //         this.height = 100;
    //         this.x = 0;
    //         this.y = gameHeight - 100;
    //         this.image = document.getElementById('robotImage');
    //         this.Framex = 0;
    //         this.Framey= 0;
    //         this.speed = 0;
    //         this.vy =0;
    //         this.weight = 1;
    //         this.tempo = 0;
    //     }
    //     draw(context){
    //         context.fillStyle = 'transparent';
    //         context.fillRect(this.x, this.y, this.width, this. height);
    //         context.drawImage(this.image, this.Framex * this.width, this.Framey * this.height,
    //         this.width, this.height , this.x, this.y, this.width, this.height);
    //     }
    //     update(input){
    //         if(input.keys.indexOf('ArrowRight') > -1){
    //             this.speed = 5;
    //             if(this.tempo <= 4){
    //                 this.Framex++;
    //             }else{
    //                 this.Framex--;
    //             }
                
    //         }else if(input.keys.indexOf('ArrowLeft') > -1){
    //             this.speed = -5;
    //         }else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
    //             this.vy -= 15;
    //         }else{
    //             this.speed = 0;
    //             this.Framex = 0;
    //         }
    //         this.x += this.speed;
        
    //         if(this.x < 0){
    //             this.x=0;
    //         }else if (this.x > this.gameWidth - this.width){
    //             this.x = this.gameWidth - this.width;
    //         }
    //         this.y += this.vy;
            
    //         if(!this.onGround()){
    //             this.vy += this.weight;
    //             this.Framey = 2;
    //         }else{
    //             this.vy = 0;
    //             this.Framey = 0;
    //         }
    //         if (this.y > this.gameHeight - this.height){
    //             this.y = this.gameHeight - this.height;
    //         }
    //     }
    //     onGround(){
    //         return this.y >= this.gameHeight - this.height;
    //     }
    // }

    const input = new InputHandler();
    
    const background = new Background(backgroundImage, 0.01);
    const tower = new Background(towerImage, 0.4);
    const floor = new Background(floorImage, 1);
    const layer = new Layer(layerImage);
    const box = new Box(boxImage);
    
    const gameBackground = [background, tower, floor];

    function animate(){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        layer.draw();
        gameBackground.forEach(object => {
            object.update();
            object.draw();
        });
        box.draw();
        requestAnimationFrame(animate);
    }   
    animate();

/**let gameSpeed =  0;
    

  
    function calculandoAtrito(miEstatico, massa, gravidade){
        forcaDeAtritoMax = miEstatico * massa * gravidade;
      
    }

    function calculandoAceleracao(forcaDeAtritoMax, FORÇA_RESULTANTE, massa){
        aceleracao = FORÇA_RESULTANTE / massa;
        if(FORÇA_RESULTANTE > forcaDeAtritoMax){
            gameSpeed = aceleracao;
        }else{
            gameSpeed -= 0;
        }
    };

function animate(){
    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS); 
    
    
    
    requestAnimationFrame(animate);
};

function KeyDown(evt){
    gameSpeed = 0;
    switch (evt.keyCode) {
        case 37: //esquerda
            gameSpeed = 0;
            break;
        case 39:  //direita
            gameSpeed++;
            animate();
            break;

        default:
            break;
    }
}

    window.addEventListener('keydown', KeyDown, true);
*/
/** 
const POSICAO_HORIZONTAL = 0;
const POSICAO_VERTICAL = 0;
const POSICAO_HORIZONTAL_CAIXA = 0;

let contadorDeFrames = 0;
let gameFrame = 0;
const staggerFrames = 9;

var canvas;
var ctx;
var dx = 5;//variação horizontal(velocidade)
var dy = 5;//variação vertical(velocidade)
var x = 300;//posição horizontal do obj
var y = 500;//posição vertical do obj

var xc = 500;//posição horizontal do obj


var w = 1000;//largura
var h = 900;//altura

function draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x, y, 50, 50)
    ctx.rect(500, y, 50, 50)
    ctx.fill();
}

function clear() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function start() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}


function Atualizar() {
    clear();    
    draw();
}
window.addEventListener('keydown', KeyDown, true);
start();
*/


    
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

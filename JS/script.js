/** @type {HTMLCanvasElement} */

window.addEventListener('load', function(){
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

const LARGURA_CANVAS = canvas.width = 520;
const ALTURA_CANVAS = canvas.height = 250;

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

class Player{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 50;
        this.height = 50;
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.image = document.getElementById('playerImage');
        this.Framex = 0;
        this.Framey= 0;
        this.speed = 0;
        this.vy =0;
        this.weight = 1;
    }
    draw(context){
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this. height);
        context.drawImage(this.image, this.Framex * this.width, this.Framey * this.height,
        this.width, this.height , this.x, this.y, this.width, this.height);
    }
    update(input){
        if(input.keys.indexOf('ArrowRight') > -1){
            this.speed = 5;
        }else if(input.keys.indexOf('ArrowLeft') > -1){
            this.speed = -5;
        }else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -= 15;
        }else{
            this.speed = 0;
        }

        this.x += this.speed;
        if(this.x < 0) this.x=0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

        this.y += this.vy;

        if(!this.onGround()){
            this.vy += this.weight;
            this.Framey = 2;
        }else{
            this.vy = 0;
            this.Framey = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
 
    }
    onGround(){
        return this.y >= this.gameHeight - this.height;
    }
}

class background{

}

const input = new InputHandler();
const player = new Player(LARGURA_CANVAS, ALTURA_CANVAS);

function animate(){
    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);
}
animate();

});

/**let gameSpeed =  0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '../IMG/background.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = '../IMG/floor.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = '../IMG/ballon.png';
class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.speedModifier = 0;
        this.width = 520;
        this.height = 250;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = 0;
        this.speed = gameSpeed * this.speedModifier;
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

const layer1 = new Layer(backgroundLayer1, 0.1);
const layer2 = new Layer(backgroundLayer2, 1);
const layer3 = new Layer(backgroundLayer3, 0.3);

const gameObjects =[layer1, layer2, layer3];

function animate(){
    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS); 
    
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    
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

function KeyDown(evt){
    switch (evt.keyCode) {
        case 37: //esquerda
            if (x - dx > 0){
                x -= dx;
            }
            break;
        case 39:  //direita
            if (x + dx < w){
                x += dx;
            }
            break;
    }
}

function Atualizar() {
    clear();    
    draw();
}
window.addEventListener('keydown', KeyDown, true);
start();
*/


/**
    
    const LARGURA_SPRITE = 64;
    const ALTURA_SPRITE = 64;
    const sprite = new Image();
    sprite.src = '../IMG/PC Computer - RPG Maker MV - Character 05 Battle.png';
 
    function animate(){
    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
    ctx.drawImage(sprite, contadorDeFrames * LARGURA_SPRITE, 0, LARGURA_SPRITE, ALTURA_SPRITE, 0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
    if(gameFrame % staggerFrames == 0){
        if(contadorDeFrames < 5 ) contadorDeFrames++;
        else contadorDeFrames = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate);
} 
 */










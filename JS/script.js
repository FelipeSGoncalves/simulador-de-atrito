
/** @type {HTMLCanvasElement} */

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 1400;
const CANVAS_HEIGHT = canvas.height = 720;

// declaração das imagens
const backgroundImage = new Image();
backgroundImage.src = './IMG/terra/background.png';

const towerImage = new Image();
towerImage.src = './IMG/terra/tower.png';

const floorImage = new Image();
floorImage.src = './IMG/terra/floor.png';

const layerImage = new Image();
layerImage.src = './IMG/terra/layer.png';

const robotImage = new Image();
robotImage.src = './IMG/robot_player.png';

const boxImage = new Image();
boxImage.src = './IMG/wooden_box.png';

//declaração de variaveis
let gameSpeed = 0;
let contador = 0;
// variaveis fundamentais para a fisica
let massa = 5;
let gravidade = 10;
let forcaAplicada = 0;
let velocidadeIn = 0;
let deslocamentoIn;
let movimentoSuculento = 0;
let tempo = 0;
let atrito = 0;
let coeficienteAtritoEst = 0;
let coeficienteAtritoCin = 0;
let taEncostado = true;
let continuaAndando = true;
let stop = false;


// função responsável por pegar o valor da força aplicada, através do input




// função responsável por pegar o valor do atrito, através do input
   // slider força aplicada ------------
   const sliderForcaAplicada = document.getElementById('custom-slider');
   sliderForcaAplicada.value = forcaAplicada;

   const showForcaAplicada = document.getElementById('current-fa');
   showForcaAplicada.innerHTML = forcaAplicada;

   sliderForcaAplicada.addEventListener('input', function(e){
       forcaAplicada = e.target.value;
       showForcaAplicada.innerText = e.target.value;
    //    showForcaAplicada.classList.add("active");
    //    showForcaAplicada.style.left = `${e.target.value/2}%`;
       console.log("FORCA APLICADA: ", forcaAplicada);

       
    document.getElementById("seta").style.width = `${forcaAplicada}px`;
    document.getElementById("seta").style.height = "30px";
   });

   sliderForcaAplicada.addEventListener("blur", function(e){
       showForcaAplicada.classList.remove("active");
   });


  // slider coeficiente de atrito
   const sliderAtrito = document.getElementById('custom-slider_atrito');
   sliderAtrito.value = coeficienteAtritoEst;

   const showAtrito = document.getElementById('current-atrito');
   showAtrito.innerHTML = coeficienteAtritoEst;

   sliderAtrito.addEventListener('input', function(e){
       coeficienteAtritoEst = e.target.value;
       coeficienteAtritoCin = coeficienteAtritoEst - (coeficienteAtritoEst/10);
       showAtrito.innerText = e.target.value;
    //    showAtrito.classList.add("active");
    //    showAtrito.style.left = `${e.target.value/2}%`;
       console.log("ATRITO: ", atrito);
   });

   sliderAtrito.addEventListener("blur", function(e){
       showAtrito.classList.remove("active");
   });

   // slider gravidade
   const sliderGravidade = document.getElementById('custom-slider_gravidade');
   sliderGravidade.value = gravidade;

   const showGravidade = document.getElementById('current-gravidade');
   showGravidade.innerHTML = gravidade;

   sliderGravidade.addEventListener('input', function(e){
       gravidade = e.target.value;
       showGravidade.innerText = e.target.value;
    //    showAtrito.classList.add("active");
    //    showAtrito.style.left = `${e.target.value/2}%`;
       console.log("GRAVIDADE: ", gravidade);

       document.getElementById("seta2").style.width = `${gravidade}px`;
       document.getElementById("seta2").style.height = "30px";
   });

   sliderGravidade.addEventListener("blur", function(e){
       showGravidade.classList.remove("active");
   });

   // slider massa
   const sliderMassa = document.getElementById('custom-slider_massa');
   sliderMassa.value = massa;

   const showMassa = document.getElementById('current-massa');
   showMassa.innerHTML = massa;

   sliderMassa.addEventListener('input', function(e){
       massa = e.target.value;
       showMassa.innerText = e.target.value;
    //    showAtrito.classList.add("active");
    //    showAtrito.style.left = `${e.target.value/2}%`;
       console.log("MASSA: ", massa);
   });

   sliderMassa.addEventListener("blur", function(e){
       showMassa.classList.remove("active");
   });

   //velocimetro
   const showVelocimetro = document.querySelector(".velocimetro");

   function setVelocimetroValue(velocidade, valor){
       velocidade.querySelector(".velocimetro__cover").textContent = Math.round(valor) + " m/s";
   }

   
    
//função responsável por obter quais teclas estão sendo precionadas
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
        this.speed = calculoMovimentacao() * this.speedModifier;
    }
    update(){
        this.speed = calculoMovimentacao() * this.speedModifier;         
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
        this.x = 0;
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
        context.fillRect(this.x, this.y, this.width, this. height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    colide(){
        if(this.x + this.width > (CANVAS_WIDTH/2)){
            if(this.x + this.width > (CANVAS_WIDTH/2)){
                this.x -= ((this.x + this.width) - (CANVAS_WIDTH/2)) - 1; 
            }
            return true;
        }else{
            return false;
        }
        
    }
    update(input){ 
            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            }else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            }
            this.x += this.speed;
            if(this.x < -this.width) this.x = -this.width;     
    }    
}

// funções responsaveis pelos calculos

// calculo da força peso
function forcaPeso(){
    let forcaP;
    forcaP = massa * gravidade;

    return forcaP;
}

// calculo da força de atrito estatico
function fatEstatico(){
    let forcaAtritoEst;
    forcaAtritoEst = coeficienteAtritoEst * forcaPeso();

    return forcaAtritoEst;
}

// calculo da força de atrito cinetico
function fatCinetico(){
    let forcaAtritoCin;
    forcaAtritoCin = coeficienteAtritoCin * forcaPeso();

    return forcaAtritoCin;
}

// calculo da força resultante
function forcaResultante(){
    let forcaRes;
    forcaRes = forcaAplicada - fatCinetico();

    return forcaRes;
}

// calculo da aceleração
function aceleracao(){
    let aceleracao;
    aceleracao = (forcaAplicada - fatEstatico()) / massa;

    return aceleracao;
}

function velo(){
    let velocidade;
    tempo = (tempo+1)/24;
    velocidade = 0 + aceleracao() * tempo;

    return velocidade;
}

function desaceleracao(){
    let desaceleracao;
    desaceleracao = forcaResultante()/massa;

    console.log("DESACELERA: ", desaceleracao);
    return desaceleracao;
}

// calculo de velocidade final
function velocidadeF(){
    let velocidadeF;
    velocidadeF = velocidadeIn + aceleracao() * tempo;

    return velocidadeF;
}

// calculo do deslocamento
function deslocamento(){
    let descolamento;
    deslocamento = (deslocamentoIn + velocidadeIn * tempo + aceleracao() * Math.pow(tempo, 2)) / 2;

    return descolamento;
}


function calculoMovimentacao(){
    contador++;
        if(forcaAplicada > fatEstatico()){
            if(movimentoSuculento <= 100 && taEncostado == true && contador%24==0){
                movimentoSuculento += aceleracao(); 
                console.log(aceleracao());
                console.log(movimentoSuculento);
                setVelocimetroValue(showVelocimetro, movimentoSuculento);
                //testando();  
            }
        }
        else if(contador %24 == 0 || movimentoSuculento > 150){
            movimentoSuculento += desaceleracao();
            console.log(movimentoSuculento);
            setVelocimetroValue(showVelocimetro, movimentoSuculento);

            if(movimentoSuculento <= 0){
                movimentoSuculento = 0;
                setVelocimetroValue(showVelocimetro, movimentoSuculento);
            } 
        }
        return movimentoSuculento;
}

const input = new InputHandler();
const background = new Background(backgroundImage, 0.01);
const tower = new Background(towerImage, 0.4);
const floor = new Background(floorImage, 1);
const layer = new Layer(layerImage);
const box = new Box(boxImage);
const robot = new Robot(robotImage);

const gameBackground = [background, tower, floor];


function start(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackground.forEach(object => {
        object.draw();
    });
    layer.draw();
    box.draw();
    robot.draw(ctx);
    robot.update(input);
    let x = robot.colide();
    if(x == true){
        console.log(x);
        animate();
    }else{
        requestAnimationFrame(start);
        console.log(x);
    }
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameBackground.forEach(object => {
        object.draw();
        object.update();
    });
    layer.draw();
    box.draw();
    robot.update(input);
    robot.draw(ctx);
    let x = robot.colide();
    if(x == true){
        requestAnimationFrame(animate);
    }else{
        robot.update(input);
        taEncostado = false;
        forcaAplicada = 0;
        requestAnimationFrame(animate);
    }
}

start();

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
let coeficienteAtritoEst = 0.5;
let coeficienteAtritoCin = 0.4;
let taEncostado = true;
let continuaAndando = true;

// função responsável por pegar o valor da força aplicada, através do input



    const btn = document.querySelector("button");
    const txt = document.querySelector("p");
    btn.addEventListener("click", updateBtn);

    function updateBtn() {
        if (btn.textContent === "Start Machine") {
            btn.textContent = "Stop Machine";
            txt.textContent = "The Machine has Started";
            taEncostado = true;
        } else {
            btn.textContent = "Start Machine";
            txt.textContent = "The Machine is Stopped";
            taEncostado = false;
        }
    }


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

    const slider = document.getElementById('slider');
    slider.value = forcaAplicada;
    
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = forcaAplicada;
    
    slider.addEventListener('change', function(e){
        forcaAplicada = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });

    // gravidade
    const sliderGravidade = document.getElementById('sliderGravidade');
    sliderGravidade.value = gravidade;
    const showGravidade = document.getElementById('showGravidade');
    showGravidade.innerHTML = gravidade;
    
    sliderGravidade.addEventListener('change', function(e){
        gravidade = e.target.value;
        console.log("Gravidade: ", gravidade);
        showGravidade.innerHTML = e.target.value;
    });

    // massa
    const sliderMassa = document.getElementById('sliderMassa');
    sliderMassa.value = massa;
    const showMassa = document.getElementById('showMassa');
    showMassa.innerHTML = massa;
     
    sliderMassa.addEventListener('change', function(e){
        massa = e.target.value;
        console.log("Massa: ", massa);
        showMassa.innerHTML = e.target.value;
    });

    //velocimetro
    const showVelocimetro = document.querySelector(".velocimetro");

    function setVelocimetroValue(velocidade, valor){
        velocidade.querySelector(".velocimetro__cover").textContent = Math.round(valor) + " m/s";
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
    desaceleracao = (0 - 250) / 500;

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
            if(movimentoSuculento <= 150 && taEncostado == true && contador%24==0){
                movimentoSuculento += aceleracao(); 
                console.log(aceleracao());
                console.log(movimentoSuculento);
                setVelocimetroValue(showVelocimetro, movimentoSuculento);
                //testando();
            }
            else if(contador %24 == 0){
                movimentoSuculento += desaceleracao();
                console.log(movimentoSuculento);
                setVelocimetroValue(showVelocimetro, movimentoSuculento);
            }

            if(movimentoSuculento < 0){
                movimentoSuculento = 0;
            }
        }
        return movimentoSuculento;
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
        ctx.drawImage(this.image, this.x2-1, this.y, this.width, this.height);
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
        }
    }
    update(input){ 
            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            }else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            }else{
                this.speed = 0;
            }
            this.x += this.speed;
            if(this.x < 0) this.x = 0;
            else if (this.x > CANVAS_WIDTH - this.width) this.x = CANVAS_WIDTH - this.width;       
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

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer.draw();
    gameBackground.forEach(object => {
        object.update();
        object.draw();
    }); 
    box.draw();
    robot.draw(ctx);
    robot.colide();
    robot.update(input);
    requestAnimationFrame(animate);
}
animate();/** @type {HTMLCanvasElement} */

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
let coeficienteAtritoEst = 0.5;
let coeficienteAtritoCin = 0.4;
let taEncostado = true;
let continuaAndando = true;

// função responsável por pegar o valor da força aplicada, através do input



    const btn = document.querySelector("button");
    const txt = document.querySelector("p");
    btn.addEventListener("click", updateBtn);

    function updateBtn() {
        if (btn.textContent === "Start Machine") {
            btn.textContent = "Stop Machine";
            txt.textContent = "The Machine has Started";
            taEncostado = true;
        } else {
            btn.textContent = "Start Machine";
            txt.textContent = "The Machine is Stopped";
            taEncostado = false;
        }
    }


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

    const slider = document.getElementById('slider');
    slider.value = forcaAplicada;
    
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = forcaAplicada;
    
    slider.addEventListener('change', function(e){
        forcaAplicada = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });

    // gravidade
    const sliderGravidade = document.getElementById('sliderGravidade');
    sliderGravidade.value = gravidade;
    const showGravidade = document.getElementById('showGravidade');
    showGravidade.innerHTML = gravidade;
    
    sliderGravidade.addEventListener('change', function(e){
        gravidade = e.target.value;
        console.log("Gravidade: ", gravidade);
        showGravidade.innerHTML = e.target.value;
    });

    // massa
    const sliderMassa = document.getElementById('sliderMassa');
    sliderMassa.value = massa;
    const showMassa = document.getElementById('showMassa');
    showMassa.innerHTML = massa;
     
    sliderMassa.addEventListener('change', function(e){
        massa = e.target.value;
        console.log("Massa: ", massa);
        showMassa.innerHTML = e.target.value;
    });

    //velocimetro
    const showVelocimetro = document.querySelector(".velocimetro");

    function setVelocimetroValue(velocidade, valor){
        velocidade.querySelector(".velocimetro__cover").textContent = Math.round(valor) + " m/s";
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
    desaceleracao = (0 - 250) / 500;

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
            if(movimentoSuculento <= 150 && taEncostado == true && contador%24==0){
                movimentoSuculento += aceleracao(); 
                console.log(aceleracao());
                console.log(movimentoSuculento);
                setVelocimetroValue(showVelocimetro, movimentoSuculento);
                //testando();
            }
            else if(contador %24 == 0){
                movimentoSuculento += desaceleracao();
                console.log(movimentoSuculento);
                setVelocimetroValue(showVelocimetro, movimentoSuculento);
            }

            if(movimentoSuculento < 0){
                movimentoSuculento = 0;
            }
        }
        return movimentoSuculento;
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
        ctx.drawImage(this.image, this.x2-1, this.y, this.width, this.height);
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
        }
    }
    update(input){ 
            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            }else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            }else{
                this.speed = 0;
            }
            this.x += this.speed;
            if(this.x < 0) this.x = 0;
            else if (this.x > CANVAS_WIDTH - this.width) this.x = CANVAS_WIDTH - this.width;       
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

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer.draw();
    gameBackground.forEach(object => {
        object.update();
        object.draw();
    }); 
    box.draw();
    robot.draw(ctx);
    robot.colide();
    robot.update(input);
    requestAnimationFrame(animate);
}
animate();

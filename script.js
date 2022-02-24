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
    return setInterval(Atualizar, 60);
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
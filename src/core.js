import Bullet from './obj/Bullet.js';
import Star from './obj/Star.js';
import GameManager from './GameManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gameManager = new GameManager(canvas.width, canvas.height);

function init() {
    gameManager.initObjs();
}

function update() {
    gameManager.update();
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameManager.draw(ctx);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
loop();
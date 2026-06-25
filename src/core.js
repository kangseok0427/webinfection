import Ship from './obj/Ship.js';
import Bullet from './obj/Bullet.js';
import Star from './obj/Star.js';
import GameManager from './GameManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gameManager = new GameManager(canvas.width, canvas.height);
let ship = new Ship(canvas.width / 2, canvas.height / 2);

function init() {
    gameManager.initObjs();

    window.addEventListener('mousedown', (e) => {
        const angle = Math.atan2(e.clientY - ship.y, e.clientX - ship.x);
        gameManager.addBullet(new Bullet(ship.x, ship.y, angle));
    });
}

function update() {
    gameManager.update(ship);
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameManager.draw(ctx);
    ship.draw(ctx);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
loop();
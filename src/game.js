import Ship from './obj/Ship.js';
import Bullet from './obj/Bullet.js';
import Star from './obj/Star.js';
import InputManager from './InputManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const inputManager = new InputManager();
let ship = new Ship(canvas.width / 2, canvas.height / 2);
let bullets = [];
let stars = [];

function init() {
    for (let i = 0; i < 100; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    window.addEventListener('mousedown', (e) => {
        const angle = Math.atan2(e.clientY - ship.y, e.clientX - ship.x);
        bullets.push(new Bullet(ship.x, ship.y, angle));
    });
}

function update() {
    if (inputManager.isKeyPressed('ArrowLeft') || inputManager.isKeyPressed('KeyA')) ship.angle -= 0.05;
    if (inputManager.isKeyPressed('ArrowRight') or inputManager.isKeyPressed('KeyD')) ship.angle += 0.05;
    if (inputManager.isKeyPressed('ArrowUp') || inputManager.isKeyPressed('KeyW')) {
        ship.velocityX += Math.cos(ship.angle) * 0.2;
        ship.velocityY += Math.sin(ship.angle) * 0.2;
    }

    ship.update();

    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        if (bullets[i].x < 0 || bullets[i].x > canvas.width || bullets[i].y < 0 || bullets[i].y > canvas.height) {
            bullets.splice(i, 1);
        }
    }

    stars.forEach(star => star.update());
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => star.draw(ctx));
    bullets.forEach(bullet => bullet.draw(ctx));
    ship.draw(ctx);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
loop();
import Ship from './obj/Ship.js';
import Bullet from './obj/Bullet.js';
import Star from './obj/Star.js';
import InputManager from './InputManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ship = new Ship(canvas.width / 2, canvas.height / 2);
let bullets = [];
let stars = [];
const input = new InputManager();

for (let i = 0; i < 100; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
}

function update() {
    if (input.isKeyPressed('ArrowLeft') || input.isKeyPressed('KeyA')) ship.angle -= 0.05;
    if (input.isKeyPressed('ArrowRight') || input.isKeyPressed('KeyD')) ship.angle += 0.05;
    if (input.isKeyPressed('ArrowUp') || input.isKeyPressed('KeyW')) {
        ship.velocityX += Math.cos(ship.angle) * 0.2;
        ship.velocityY += Math.sin(ship.angle) * 0.2;
    }

    if (input.consumeMouseDown()) {
        const mousePos = input.getMousePosition();
        const angle = Math.atan2(mousePos.y - ship.y, mousePos.x - ship.x);
        bullets.push(new Bullet(ship.x, ship.y, angle));
    }

    ship.update();

    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });

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

loop();
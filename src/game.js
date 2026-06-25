import Ship from './obj/Ship.js';
import Bullet from './obj/Bullet.js';
import Star from './obj/Star.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ship = new Ship(canvas.width / 2, canvas.height / 2);
let bullets = [];
let stars = [];

for (let i = 0; i < 100; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
}

const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);
window.addEventListener('mousedown', (e) => {
    const angle = Math.atan2(e.clientY - ship.y, e.clientX - ship.x);
    bullets.push(new Bullet(ship.x, ship.y, angle));
});

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) ship.angle -= 0.05;
    if (keys['ArrowRight'] || keys['KeyD']) ship.angle += 0.05;
    if (keys['ArrowUp'] || keys['KeyW']) {
        ship.velocityX += Math.cos(ship.angle) * 0.2;
        ship.velocityY += Math.sin(ship.angle) * 0.2;
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
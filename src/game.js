class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.hp = 100;
        this.maxHp = 100;
        this.friction = 0.99;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
        if (Math.abs(this.lack) < 0.01) this.velocityX = 0;
        if (Math.abs(this.velocityY) < 0.01) this.velocityY = 0;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
}

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.velocityX = Math.cos(angle) * 7;
        this.velocityY = Math.sin(angle) * 7;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffff00';
        ctx.fill();
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = Math.random() * 0.1 - 0.05;
        this.velocityY = Math.random() * 0.1 - 0.05;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
}

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let ship;
let bullets = [];
let stars = [];
let keys = {};
let score = 0;
let startTime;
let elapsedTime = 0;
let gameOver = false;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ship = new Ship(canvas.width / 2, canvas.height / 2);
    bullets = [];
    stars = [];
    score = 0;
    startTime = Date.now();
    elapsedTime = 0;
    gameOver = false;
    for (let i = 0; i < 100; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (gameOver && e.code === 'KeyR') init();
});
window.addEventListener('keyup', (e) => keys[e.code] = false);
window.addEventListener('mousedown', (e) => {
    if (!gameOver) {
        const angle = Math.atan2(e.clientY - ship.y, e.clientX - ship.x);
        bullets.push(new Bullet(ship.x, ship.y, angle));
    }
});

function update() {
    if (gameOver) return;

    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    
    if (keys['ArrowLeft'] || keys['KeyA']) ship.angle -= 0.05;
    if (keys['ArrowRight'] || keys['KeyD']) ship.angle += 0.05;
    if (keys['ArrowUp'] || keys['KeyW']) {
        ship.velocityX += Math.cos(ship.angle) * 0.2;
        ship.velocityY += Math.sin(ship.angle) * 0.2;
    }

    ship.update();
    stars.forEach(star => star.update());
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.passHeight) {
            bullets.splice(index, 1);
        }
    });

    if (ship.hp <= 0) {
        ship.hp = 0;
        gameOver = true;
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => star.draw(ctx));
    bullets.forEach(bullet => bullet.draw(ctx));
    ship.draw(ctx);

    // UI - HP Bar
    ctx.font = '16px monospace';
    ctx.fillStyle = '#00ff41';
    ctx.fillText(`HP ${Math.ceil(ship.hp)}/${ship.maxHp}`, 20, 30);
    ctx.strokeStyle = '#00ff41';
    ctx.strokeRect(20, 40, 150, 10);
    ctx.fillStyle = '#00ff41';
    ctx.fillRect(20, 40, (ship.hp / ship.maxHp) * 150, 10);

    // UI - Timer
    const mins = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const secs = (elapsedTime % 60).toString().padStart(2, '0');
    ctx.fillStyle = '#00ffff';
    ctx.textAlign = 'right';
    ctx.fillText(`${mins}:${secs}`, canvas.width - 20, 30);

    // UI - Score
    ctx.fillStyle = '#ffff00';
    ctx.fillText(`SCORE: ${score}`, canvas.width - 20, 55);

    // UI - Game Over
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = '60px monospace';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '20px monospace';
        ctx.fillText(`TIME: ${mins}:${secs}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText(`SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillStyle = '#00ffff';
        ctx.fillText('PRESS [R] TO RESTART', canvas.width / 2, canvas.height / 2 + 80);
    }

    ctx.textAlign = 'left';
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
loop();
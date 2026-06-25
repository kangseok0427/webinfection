class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.hp = 100;
        this.friction = 0.99;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
        if (Math.abs(this.velocityX) < 0.01) this.velocityX = 0;
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

let ship = new Ship(window.innerWidth / 2, window.innerHeight / 2);
let bullets = [];
let stars = [];
let keys = {};
let lastFireTime = 0;

for (let i = 0; i < 100; i++) {
    stars.push(new Star(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
}

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function update() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ship.update();
    ship.draw(ctx);
    for (let bullet of bullets) {
        bullet.update();
        bullet.draw(ctx);
    }
    for (let star of stars) {
        star.update();
        star.draw(ctx);
    }
    if (keys['w'] || keys['W']) {
        ship.velocityX += Math.cos(ship.angle) * 0.1;
        ship.velocityY += Math.sin(ship.angle) * 0.1;
    }
    if (keys['a'] || keys['A']) {
        ship.angle -= 0.1;
    }
    if (keys['d'] || keys['D']) {
        ship.angle += 0.1;
    }
    if (keys[' '] && Date.now() - lastFireTime > 250) {
        bullets.push(new Bullet(ship.x, ship.y, ship.angle));
        lastFireTime = Date.now();
    }
}

function draw() {
    update();
    requestAnimationFrame(draw);
}

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

draw();
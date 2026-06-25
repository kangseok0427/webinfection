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

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 2;
    }
    update(ship) {
        let dx = ship.x - this.x;
        let dy = ship.y - this.y;
        let angle = Math.atan2(dy, dx);
        this.angle = angle;
        this.velocityX = Math.cos(angle) * this.speed;
        this.velocityY = Math.sin(angle) * this.speed;
        this.x += this.velocityX;
        this.y += this.velocityY;
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
        ctx.moveTo(-10, 0);
        ctx.lineTo(10, -10);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
}

let ship = new Ship(window.innerWidth / 2, window.innerHeight / 2);
let bullets = [];
let stars = [];
let enemy = null;
let lastTime = 0;
let timer = 0;

function init() {
    let canvas = document.getElementById('game-canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 100; i++) {
        stars.push(new Star(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
}

function update(ctx, time) {
    let deltaTime = time - lastTime;
    lastTime = time;
    timer += deltaTime;
    if (timer > 15000 && enemy === null) {
        enemy = new Enemy(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    }
    ship.update();
    if (enemy !== null) enemy.update(ship);
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        if (bullets[i].x < 0 || bullets[i].x > window.innerWidth || bullets[i].y < 0 || bullets[i].y > window.innerHeight) {
            bullets.splice(i, 1);
        }
    }
    for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].update();
    }
}

function draw(ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ship.draw(ctx);
    if (enemy !== null) enemy.draw(ctx);
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(ctx);
    }
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw(ctx);
    }
}

function main() {
    let canvas = document.getElementById('game-canvas');
    let ctx = canvas.getContext('2d');
    init();
    function loop(time) {
        update(ctx, time);
        draw(ctx);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            bullets.push(new Bullet(ship.x, ship.y, ship.angle));
        }
        if (e.key === 'ArrowUp') {
            ship.velocityX += Math.cos(ship.angle) * 0.5;
            ship.velocityY += Math.sin(ship.angle) * 0.5;
        }
        if (e.key === 'ArrowDown') {
            ship.velocityX -= Math.cos(ship.angle) * 0.5;
            ship.velocityY -= Math.sin(ship.angle) * 0.5;
        }
        if (e.key === 'ArrowLeft') {
            ship.angle -= 0.1;
        }
        if (e.key === 'ArrowRight') {
            ship.angle += 0.1;
        }
    });
}

main();

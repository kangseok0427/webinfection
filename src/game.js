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
        if (this.x < 0) this.x = 800;
        if (this.x > 800) this.x = 0;
        if (this.y < 0) this.y = 600;
        if (this.y > 600) this.y = 0;
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
        if (this.x < 0) this.x = 800;
        if (this.x > 800) this.x = 0;
        if (this.y < 0) this.y = 600;
        if (this.y > 600) this.y = 0;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
}

let ship = new Ship(400, 300);
let bullets = [];
let stars = [];
let keys = {};
let lastShotTime = 0;

for (let i = 0; i < 10; i++) {
    stars.push(new Star(Math.random() * 800, Math.random() * 600));
}

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let gameOver = false;

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 800, 600);
    for (let star of stars) {
        star.draw(ctx);
    }
    ship.draw(ctx);
    for (let bullet of bullets) {
        bullet.draw(ctx);
    }
    ctx.font = '24px Arial';
    ctx.fillStyle = '#00ff41';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`HP: ${ship.hp}`, 10, 10);
    if (gameOver) {
        ctx.font = '48px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over', 400, 300);
    }
}

function update() {
    if (!gameOver) {
        if (keys['w']) {
            ship.velocityX += Math.cos(ship.angle) * 0.15;
            ship.velocityY += Math.sin(ship.angle) * 0.15;
        }
        if (keys['a']) {
            ship.angle -= 0.07;
        }
        if (keys['d']) {
            ship.angle += 0.07;
        }
        if (keys[' ']) {
            let currentTime = Date.now();
            if (currentTime - lastShotTime > 250) {
                let bulletX = ship.x + Math.cos(ship.angle) * 15;
                let bulletY = ship.y + Math.sin(ship.angle) * 15;
                bullets.push(new Bullet(bulletX, bulletY, ship.angle));
                lastShotTime = currentTime;
            }
        }

        ship.update();
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].update();
            if (bullets[i].x < 0 || bullets[i].x > 800 || bullets[i].y < 0 || bullets[i].y > 600) {
                bullets.splice(i, 1);
            }
        }
        for (let star of stars) {
            star.update();
        }
    }
}

function loop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(loop);
    }
}

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') keys[' '] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    if (e.key === ' ') keys[' '] = false;
});

loop();
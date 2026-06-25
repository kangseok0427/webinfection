const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: Math.cos(angle) * 7,
            y: Math.sin(angle) * 7
        };
        this.radius = 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffff00';
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Ship {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 15;
        this.angle = 0;
        this.velocity = { x: 0, y: 0 };
        this.rotationSpeed = 0.05;
        this.acceleration = 0.15;
        this.friction = 0.99;
        this.lastShot = 0;
        this.shootCooldown = 250;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(-15, -15);
        ctx.lineTo(-10, 0);
        ctx.lineTo(-15, 15);
        ctx.closePath();
        
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (keys['KeyW']) {
            ctx.beginPath();
            ctx.moveTo(-12, -5);
            ctx.lineTo(-25, 0);
            ctx.lineTo(-12, 5);
            ctx.strokeStyle = '#ffaa00';
            ctx.stroke();
        }

        ctx.restore();
    }

    update() {
        if (keys['KeyA']) {
            this.angle -= this.rotationSpeed;
        }
        if (keys['KeyD']) {
            this.angle += this.rotationSpeed;
        }

        if (keys['KeyW']) {
            this.velocity.x += Math.cos(this.angle) * this.acceleration;
            this.velocity.y += Math.sin(this.angle) * this.acceleration;
        }

        // Shooting logic
        if (keys['Space'] && Date.now() - this.lastShot > this.shootCooldown) {
            bullets.push(new Bullet(this.x, this.y, this.angle));
            this.lastShot = Date.now();
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;

        // Screen Wrap
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
}

const player = new Ship();
const bullets = [];

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    // Update and draw bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.update();
        bullet.draw();

        // Remove bullets off-screen
        if (
            bullet.x < 0 || 
            bullet.x > canvas.width || 
            bullet.y < 0 || 
            bullet.y > canvas.height
        ) {
            bullets.splice(i, 1);
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
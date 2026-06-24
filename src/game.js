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

class Ship {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 15;
        this.angle = 0;
        this.velocity = { x: 0, y: 0 };
        this.rotationSpeed = 0.05;
        this.acceleration = 0.15;
        this.friction = 0.99; // Space friction (slight)
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw ship body
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(-15, -15);
        ctx.lineTo(-10, 0);
        ctx.lineTo(-15, 15);
        ctx.closePath();
        
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Engine glow if moving
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
        // Rotation
        if (keys['KeyA']) {
            this.angle -= this.rotationSpeed;
        }
        if (keys['KeyD']) {
            this.angle += this.rotationSpeed;
        }

        // Acceleration
        if (keys['KeyW']) {
            this.velocity.x += Math.cos(this.angle) * this.acceleration;
            this.velocity.y += Math.sin(this.angle) * this.acceleration;
        }

        // Apply velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Apply friction
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

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Motion blur effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
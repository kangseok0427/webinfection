import GameObject from './GameObject.js';

export default class Ship extends GameObject {
    constructor(x, y) {
        super(x, y, true);
        this.angle = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.hp = 100;
        this.maxHp = 100;
        this.friction = 0.99;
        this.setHitRadius(10);
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
        if (Math.abs(this.x - window.innerWidth) < 10 || Math.abs(this.x) < 10) this.velocityX *= -1;
        if (Math.abs(this.y - window.innerHeight) < 10 || Math.abs(this.y) < 10) this.velocityY *= -1;
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
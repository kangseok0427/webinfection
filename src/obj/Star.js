import GameObject from './GameObject.js';

export default class Star extends GameObject {
    constructor(x, y) {
        super(x, y, false);
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
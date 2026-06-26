export default class Bullet extends GameObject {
    constructor(x, y, angle) {
        super(x, y, true);
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
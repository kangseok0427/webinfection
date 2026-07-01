import GameObject from './GameObject.js';

export default class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y, true);
        this.angle = 0;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
        this.hp = 50;
        this.maxHp = 50;
        this.speed = 1.5;
        this.setHitRadius(12);
    }

    update(ship) {
        const dx = ship.x - this.x;
        const dy = ship.y - this.y;
        this.angle = Math.atan2(dy, dx);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;
    }

    handleHit(fromName) {
        if (fromName === 'Bullet') {
            this.hp -= 10;
            if (this.hp <= 0) {
                this.hp = 0;
                this.needDestroy = true;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = '#ff0000';
        const size = 12;
        ctx.fillRect(-size/2, -size/2, size, size);
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-10, -15, 20 * (this.hp / this.maxHp), 3);
        ctx.restore();
    }
}
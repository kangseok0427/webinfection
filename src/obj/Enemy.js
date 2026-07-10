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
        this.recoilTime = 0;
    }

    update(ship) {
        if (this.recoilTime > 0) {
            this.recoilTime--;
            return;
        }

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

    handleHit(fromName, bullet) {
        if (fromName === 'Bullet') {
            this.hp -= 10;
            if (this.hp <= 0) {
                this.hp = 0;
                this.needDestroy = true;
            } else {
                this.recoilTime = 30; // Recoil for 30 frames
                const recoilAngle = Math.random() * Math.PI * 2;
                this.x += Math.cos(recoilAngle) * 5;
                this.y += Math.sin(recoilAngle) * 5;
            }
            bullet.needDestroy = true; // Remove the bullet object
        } else if (fromName === 'Ship') {
            // Handle collision with the ship
            this.needDestroy = true;
            // Optionally, you can add game over logic here
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
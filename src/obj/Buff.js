import GameObject from './GameObject.js';

export default class Buff extends GameObject {
    constructor(x, y, type) {
        super(x, y, false);
        this.type = type;
        this.width = 20;
        this.height = 20;
        this.color = 'blue';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    applyEffect(ship) {
        switch (this.type) {
            case 'speed':
                ship.speed += 0.5;
                break;
            case 'fireRate':
                ship.fireRate -= 100; // Decrease fire rate in milliseconds
                break;
            case 'health':
                ship.health += 20;
                if (ship.health > ship.maxHealth) {
                    ship.health = ship.maxHealth;
                }
                break;
        }
    }
}
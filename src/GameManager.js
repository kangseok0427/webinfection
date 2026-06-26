import Star from './obj/Star.js';
import InputManager from './InputManager.js';

export default class GameManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.inputManager = new InputManager();
        this.stars = [];
        this.bullets = [];
        this.entities = [];
    }

    initObjs() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star(Math.random() * this.width, Math.random() * this.height));
        }
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
        this.entities.push(bullet);
    }

    update(ship) {
        if (this.inputManager.isKeyPressed('ArrowLeft') || this.isKeyPressed('KeyA')) ship.angle -= 0.05;
        if (this.inputManager.isKeyPressed('ArrowRight') || this.isKeyPressed('KeyD')) ship.angle += 0.05;
        if (this.inputManager.isKeyPressed('ArrowUp') || this.inputManager.isKeyPressed('KeyW')) {
            ship.velocityX += Math.cos(ship.angle) * 0.2;
            ship.velocityY += Math.sin(ship.angle) * 0.2;
        }

        ship.update();
        if (!this.entities.includes(ship)) this.entities.push(ship);

        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.bullets[i].x < 0 || this.bullets[i].x > this.width || this.bullets[i].y < 0 || this.bullets[i].y > this.height) {
                this.entities = this.entities.filter(e => e !== this.bullets[i]);
                this.bullets.splice(i, 1);
            }
        }

        this.stars.forEach(star => star.update());

        // Collision Detection
        this.checkCollisions(ship);
    }

    isKeyPressed(code) {
        return this.inputManager.isKeyPressed(code);
    }

    checkCollisions(ship) {
        const shipRadius = 10;
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const entity = this.entities[i];
            if (entity === ship || !entity.hitEnable) continue;

            const dx = ship.x - entity.x;
            const dy = ship.y - entity.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const entityRadius = entity.hitRadius || 0;

            if (distance < shipRadius + entityRadius) {
                // If bullet hits ship
                if (entity.constructor.name === 'Bullet') {
                    ship.hp -= 10;
                    this.bullets = this.bullets.filter(b => b !== entity);
                    this.entities = this.entities.filter(e => e !== entity);
                }
            }
        }
    }

    draw(ctx) {
        this.stars.forEach(star => star.draw(ctx));
        this.bullets.nforEach(bullet => bullet.draw(ctx));
        // Note: Drawing logic for other entities should be handled by the main loop or specific managers
        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    get input() {
        return this.inputManager;
    }
}
import Star from './obj/Star.js';
import InputManager from './InputManager.js';
import Ship from './obj/Ship.js';
import Enemy from './obj/Enemy.js';
import Bullet from './obj/Bullet.js';

export default class GameManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.inputManager = new InputManager();
        this.stars = [];
        this.bullets = [];
        this.enemies = [];
        this.entities = [];
        this.ship = new Ship(width / 2, height / 2);
    }

    initObjs() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star(Math.random() * this.width, Math.random() * this.height));
        }
        
        this.enemies = [];
        for (let i = 0; i < 5; i++) {
            const enemy = new Enemy(Math.random() * this.width, Math.random() * this.height);
            this.enemies.push(enemy);
        }

        this.entities = [this.ship, ...this.enemies];
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
        this.entities.push(bullet);
    }

    update() {
        const ship = this.ship;
        if (this.inputManager.isKeyPressed('ArrowLeft') || this.inputManager.isKeyPressed('KeyA')) ship.angle -= 0.05;
        if (this.inputManager.isKeyPressed('ArrowRight') || this.inputManager.isKeyPressed('KeyD')) ship.angle += 0.05;
        if (this.inputManager.isKeyPressed('ArrowUp') || this.inputManager.isKeyPressed('KeyW')) {
            ship.velocityX += Math.cos(ship.angle) * 0.2;
            ship.velocityY += Math.sin(ship.angle) * 0.2;
        }

        ship.update();

        for (let i = this.entities.length - 1; i >= 0; i--) {
            const entity = this.entities[i];
            if (entity instanceof Enemy) {
                entity.update(ship);
            }
            if (entity instanceof Bullet) {
                entity.update();
                if (entity.x < 0 || entity.x > this.width || entity.y < 0 || entity.y > this.height) {
                    this.entities = this.entities.filter(e => e !== entity);
                    const bulletIdx = this.bullets.indexOf(entity);
                    if (bulletIdx > -1) this.bullets.splice(bulletIdx, 1);
                }
            }
        }

        this.stars.forEach(star => star.update());

        this.checkCollisions();
    }

    isKeyPressed(code) {
        return this.inputManager.isKKeyPressed(code);
    }

    checkCollisions() {
        const ship = this.ship;
        const shipRadius = 10;

        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const entityA = this.entities[i];
                const entityB = this.entities[j];

                if (!entityA.hitEnable && !entityB.hitEnable) continue;

                const dx = entityA.x - entityB.x;
                const dy = entityA.y - entityB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (entityA.hitRadius || 0) + (entityB.hitRadius || 0);

                if (distance < minDistance) {
                    if (entityA instanceof Bullet && entityB instanceof Enemy) {
                        entityB.handleHit('Bullet');
                    } else if (entityA instanceof Enemy && entityB instanceof Bullet) {
                        entityA.handleHit('Bullet');
                    }
                }
            }
        }
    }

    draw(ctx) {
        this.stars.forEach(star => star.draw(ctx));
        this.enemies.forEach(enemy => enemy.draw(ctx));
        this.bullets.forEach(bullet => bullet.draw(ctx));
        this.ship.draw(ctx);
    }
}
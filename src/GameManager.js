import Star from './obj/Star.js';
import InputManager from './Input/InputManager.js';
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
                    entity.needDestroy = true;
                }
            }
        }

        this.stars.forEach(star => star.update());

        this.checkCollisions();

        // Cleanup entities where needDestroy is true
        this.entities = this.entities.filter(e => !e.needDestroy);
        this.enemies = this.entities.filter(e => e instanceof Enemy);
        this.bullets = this.entities.filter(e => e instanceof Bullet);
    }

    isKeyPressed(code) {
        return this.inputManager.isKeyPressed(code);
    }

    checkCollisions() {
        // Collision logic implementation placeholder
    }

    draw(ctx) {
        this.stars.forEach(star => star.draw(ctx));
        this.entities.forEach(entity => entity.draw(ctx));
    }
}
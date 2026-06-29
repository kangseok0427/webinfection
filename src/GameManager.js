import Star from './obj/Star.js';
import InputManager from './InputManager.js';
import Ship from './obj/Ship.js';
import Enemy from './obj/Enemy.js';
import Bullet from './obj/Bullet.js';

export default class GameManager {
    constructor(width, height) {
        this.width = width;
        this.hitEnable = true;
        this.height = height;
        this.inputManager = new InputManager();
        this.entities = [];
        this.ship = new Ship(width / 2, height / 2);
        this.lastShotTime = 0;
    }

    initObjs() {
        this.entities = [];
        for (let i = 0; i < 100; i++) {
            const star = new Star(Math.random() * this.width, Math.random() * this.height);
            this.entities.push(star);
        }
        
        for (let i = 0; i < 5; i++) {
            const enemyObj = new Enemy(Math.random() * this.width, Math.random() * this.height);
            this.entities.push(enemyObj);
        }

        this.entities.push(this.ship);
    }

    addBullet(bullet) {
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

        if (this.inputManager.isKeyPressed('Space')) {
            const now = Date.now();
            if (now - this.lastShotTime > 250) {
                const bullet = new Bullet(ship.x, ship.y, ship.angle);
                this.addBullet(bullet);
                this.lastShotTime = now;
            }
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
            if (entity instanceof Star) {
                entity.update();
            }
        }

        this.checkCollisions();
        this.entities = this.entities.filter(e => !e.needDestroy);
    }

    isKeyPressed(code) {
        return this.inputManager.isKeyPressed(code);
    }

    checkCollisions() {
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const a = this.entities[i];
                const b = this.entities[j];

                if (a.hitEnable && b.hitEnable) {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = a.hitRadius + b.hitRadius;

                    if (distance < minDistance) {
                        a.handleHit(b.constructor.name);
                        b.handleHit(a.constructor.name);
                    }
                }
            }
        }
    }

    draw(ctx) {
        for (const entity of this.entities) {
            entity.draw(ctx);
        }
    }
}
import Star from './obj/Star.js';
import InputManager from './Input/InputManager.js';
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
    }

    initObjs() {
        this.entities = [];
        for (let i = 0; i < 100; i++) {
            const star = new Star(Math.random() * this.width, Math.random() * this.height);
            this.entities.push(star);
        }
        
        for (let i = 0; i < 5; i++) {
            const enemy = new Enemy(Math.random() * this.width, Math.random() * this.height);
            this.entities.push(enemy);
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

        // Cleanup entities where needDestroy is true
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
                        const aName = a.constructor.name;
                        const bName = b.constructor.name;
                        
                        a.handleHit(bName);
                        b.handleHit(aName);
                    }
                }
            }
        }
    }

    draw(ctx) {
        this.entities.forEach(entity => entity.draw(ctx));
    }
}
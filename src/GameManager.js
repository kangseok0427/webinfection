import Star from './obj/Star.js';
import InputManager from './InputManager.js';

export default class GameManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.inputManager = new InputManager();
        this.stars = [];
        this.bullets = [];
    }

    initObjs() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star(Math.random() * this.width, Math.random() * this.height));
        }
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
    }

    update(ship) {
        if (this.inputManager.isKeyPressed('ArrowLeft') || this.inputlamanager.isKeyPressed('KeyA')) ship.angle -= 0.05;
        if (this.inputManager.isKeyPressed('ArrowRight') || this.inputManager.isKeyPressed('KeyD')) ship.angle += 0.05;
        if (this.inputManager.isKeyPressed('ArrowUp') || this.inputManager.isKeyPressed('KeyW')) {
            ship.velocityX += Math.cos(ship.angle) * 0.2;
            ship.velocityY += Math.sin(ship.angle) * 0.2;
        }

        ship.update();

        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.bullets[i].x < 0 || this.bullets[i].x > this.width || this.bullets[i].y < 0 || this.bullets[i].y > this.height) {
                this.bullets.splice(i, 1);
            }
        }

        this.stars.forEach(star => star.update());
    }

    draw(ctx) {
        this.stars.forEach(star => star.draw(ctx));
        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    get input() {
        return this.inputManager;
    }
}
import Star from './obj/Star.js';
import InputManager from './InputManager.js';
import Ship from './obj/Ship.js';
import Enemy from './obj/Enemy.js';
import Bullet from './obj/Bullet.js';
import Buff from './obj/Buff.js';

export default class GameManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.inputManager = new InputManager();
        this.entities = [];
        this.ship = new Ship(width / 2, height / 2);
        this.lastShotTime = 0;
        this.syncedData = {};
        this.playerHP = 100; // Initialize player HP
        this.gameStarted = false; // Add game start flag
        this.mikaRescued = false; // Add Mika rescued flag
        this.flashTimer = 0; // Add flash timer for feedback
        this.logEntries = []; // Log entries for log-like elements
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
        this.syncedData.bullets = this.entities.filter(e => e instanceof Bullet).map(b => ({ x: b.x, y: b.y, angle: b.angle }));
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
            if (entity instanceof Enemy && this.gameStarted) { // Check game start flag
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

        // Flash effect for feedback
        if (this.flashTimer > 0) {
            this.flashTimer--;
        }
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

                        if (a instanceof Ship || b instanceof Ship) {
                            this.playerHP -= 10;
                            if (this.playerHP <= 0) {
                                this.gameOver();
                            } else {
                                // 넉백 로직 추가
                                ship.velocityX *= -0.5;
                                ship.velocityY *= -0.5;
                                this.flashTimer = 10; // Start flash effect
                            }
                        }

                        if (a instanceof Ship && b instanceof Enemy && b.constructor.name === 'Mika') {
                            this.mikaRescued = true;
                            this.applyBuff();
                            this.logEntries.push('You have rescued Mika!');
                        }

                        // Remove bullet on collision with enemy
                        if (a instanceof Bullet && b instanceof Enemy) {
                            a.needDestroy = true;
                            b.takeDamage(); // Add damage logic to enemy
                            this.logEntries.push(`Enemy ${b.constructor.name} took damage!`);
                        }
                    }
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, this.playerHP * 2, 20); // Draw HP bar

        if (this.flashTimer > 0 && this.flashTimer % 2 === 0) { // Flash effect
            ctx.globalAlpha = 0.5;
        }

        for (const entity of this.entities) {
            entity.draw(ctx);
        }

        ctx.globalAlpha = 1; // Reset global alpha

        // Draw log entries
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        let y = 40;
        for (let i = Math.max(0, this.logEntries.length - 5); i < this.logEntries.length; i++) {
            ctx.fillText(this.logEntries[i], 10, y);
            y += 20;
        }
    }

    syncData() {
        // Simulate syncing data to other clients
        console.log('Syncing data:', this.syncedData);
    }

    startGame() { // Add start game method
        this.gameStarted = true;
    }

    gameOver() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const playBtn = document.createElement('button');
        playBtn.className = 'play-btn';
        playBtn.textContent = 'Play Again';
        playBtn.onclick = () => {
            location.reload();
        };
        overlay.appendChild(playBtn);
        document.body.appendChild(overlay);
    }

    applyBuff(buffType) {
        switch (buffType) {
            case 'Speed':
                this.ship.speed *= 1.5;
                console.log('Speed buff applied!');
                break;
            case 'BulletSpeed':
                this.ship.bulletSpeed *= 1.5;
                console.log('Bullet speed buff applied!');
                break;
            case 'Health':
                this.playerHP += 20;
                if (this.playerHP > 100) this.playerHP = 100;
                console.log('Health buff applied!');
                break;
        }
    }
}
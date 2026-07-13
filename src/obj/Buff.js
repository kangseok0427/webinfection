import GameObject from './GameObject.js';

export default class Buff extends GameObject {
    constructor(x, y, type) {
        super(x, y, false);
        this.type = type;
        this.width = 20;
        this.height = 20;
        this.color = 'blue';
        this.duration = 5; // seconds
        this.applied = false;
        this.timer = null;
    }

    applyEffect() {
        if (!this.applied) {
            this.applied = true;
            switch (this.type) {
                case 'speed':
                    this.applySpeedBoost();
                    break;
                case 'shield':
                    this.applyShield();
                    break;
                // Add more types as needed
            }
            this.startTimer();
        }
    }

    applySpeedBoost() {
        console.log('Speed boost applied!');
        // Implement speed boost logic here
    }

    applyShield() {
        console.log('Shield applied!');
        // Implement shield logic here
    }

    startTimer() {
        this.timer = setTimeout(() => {
            this.removeEffect();
        }, this.duration * 1000);
    }

    removeEffect() {
        if (this.applied) {
            this.applied = false;
            switch (this.type) {
                case 'speed':
                    this.removeSpeedBoost();
                    break;
                case 'shield':
                    this.removeShield();
                    break;
                // Add more types as needed
            }
            clearTimeout(this.timer);
            console.log('Effect removed!');
        }
    }

    removeSpeedBoost() {
        // Implement speed boost removal logic here
    }

    removeShield() {
        // Implement shield removal logic here
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
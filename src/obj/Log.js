import GameObject from './GameObject.js';

export default class Log extends GameObject {
    constructor(x, y, message) {
        super(x, y, false);
        this.message = message;
        this.alpha = 1.0;
        this.fadeSpeed = 0.02;
    }

    update() {
        if (this.alpha > 0) {
            this.alpha -= this.fadeSpeed;
        } else {
            // Remove the log from the game objects list
            this.remove();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.font = '16px Arial';
        ctx.fillStyle = '#0f0';
        ctx.fillText(this.message, this.x, this.y);
        ctx.restore();
    }
}
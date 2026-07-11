import GameObject from './GameObject.js';

export default class UpdateLog extends GameObject {
    constructor(x, y) {
        super(x, y, false);
        this.logs = [];
        this.maxLogs = 10;
    }

    addLog(message) {
        if (this.logs.length >= this.maxLogs) {
            this.logs.shift();
        }
        this.logs.push(message);
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';

        let y = this.y;
        for (let i = 0; i < this.logs.length; i++) {
            ctx.fillText(this.logs[i], this.x, y);
            y += 14;
        }
    }
}
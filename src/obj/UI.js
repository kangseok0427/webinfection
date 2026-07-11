import GameObject from './GameObject.js';

export default class UI extends GameObject {
    constructor(version, updateLog) {
        super(0, 0, false);
        this.version = version;
        this.updateLog = updateLog;
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText(`Version: ${this.version}`, canvas.width - 150, 30);

        ctx.font = '18px Arial';
        let y = 60;
        for (let log of this.updateLog) {
            ctx.fillText(log, canvas.width - 300, y);
            y += 24;
        }
    }
}
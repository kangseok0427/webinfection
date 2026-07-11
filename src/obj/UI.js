import GameObject from './GameObject.js';

export default class UI extends GameObject {
    constructor(version) {
        super(0, 0, false);
        this.version = version;
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText(`Version: ${this.version}`, canvas.width - 120, 30);
    }
}
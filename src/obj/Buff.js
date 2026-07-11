import GameObject from './GameObject.js';

export default class Buff extends GameObject {
    constructor(x, y, type) {
        super(x, y, false);
        this.type = type;
        this.width = 20;
        this.height = 20;
        this.color = 'blue';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
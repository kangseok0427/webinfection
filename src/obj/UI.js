import GameObject from './GameObject.js';

export default class UI extends GameObject {
    constructor() {
        super(0, 0, false);
        this.text = '테스트';
    }

    draw(ctx) {
        ctx.font = '48px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, canvas.width / 2, canvas.height / 2);
    }
}
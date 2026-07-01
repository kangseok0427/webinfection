import GameObject from './GameObject.js';

export default class UI extends GameObject {
    constructor() {
        super(0, 0, false);
        this.playerHP = 100;
        this.gameOver = false;
    }

    update(player) {
        if (player.hp <= 0) {
            this.gameOver = true;
        }
        this.playerHP = player.hp;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(`HP: ${this.playerHP}`, 10, 30);

        if (this.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        }
    }
}
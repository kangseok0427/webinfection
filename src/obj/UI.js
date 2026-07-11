import GameObject from './GameObject.js';

export default class UI extends GameObject {
    constructor(version, updateLog) {
        super(0, 0, false);
        this.version = version;
        this.updateLog = updateLog;
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText(`Version: ${this.version}`, canvas.width - 120, 30);

        // Draw update log box
        const logBoxWidth = 200;
        const logBoxHeight = 150;
        const logBoxX = 10;
        const logBoxY = canvas.height - logBoxHeight - 10;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(logBoxX, logBoxY, logBoxWidth, logBoxHeight);

        ctx.strokeStyle = '#fff';
        ctx.strokeRect(logBoxX, logBoxY, logBoxWidth, logBoxHeight);

        ctx.font = '14px Arial';
        let textY = logBoxY + 20;
        const lineHeight = 20;

        this.updateLog.forEach((log, index) => {
            if (textY + lineHeight <= logBoxY + logBoxHeight - 10) {
                ctx.fillText(log, logBoxX + 10, textY);
                textY += lineHeight;
            }
        });
    }
}
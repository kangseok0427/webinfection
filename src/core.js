import GameManager from './GameManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let gameManager;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (gameManager && typeof gameManager.resize === 'function') {
        gameManager.resize(canvas.width, canvas.height);
    }
}

function init() {
    resize();
    gameManager = new GameManager(canvas.width, canvas.height);
    gameManager.initObjs();
}

function update() {
    if (gameManager) gameManager.update();
}

function draw() {
    if (!gameManager) return;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gameManager.draw(ctx);

    // Draw HP bar
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, gameManager.playerHP * 2, 20);

    // Draw "테스트" text in the center
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('테스트', canvas.width / 2, canvas.height / 2);

    // Draw version number at top right
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText('Version 1.0', canvas.width - 10, 30);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
init();
loop();
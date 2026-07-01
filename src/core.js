import GameManager from './GameManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let gameManager;
let gameOverOverlay;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (gameManager && typeof gameManager.resize === 'function') {
        gameManager.resize(canvas.width, canvas.height);
    }
    if (gameManager && typeof gameManager.updateBounds === 'function') {
        gameManager.updateBounds(canvas.width, canvas.height);
    }
}

function init() {
    resize();
    gameManager = new GameManager(canvas.width, canvas.height);
    gameManager.initObjs();

    gameOverOverlay = document.createElement('div');
    gameOverOverlay.className = 'overlay';
    gameOverOverlay.innerHTML = '<h1>Game Over</h1>';
    document.body.appendChild(gameOverOverlay);
    gameOverOverlay.style.display = 'none';
}

function update() {
    if (gameManager) gameManager.update();
    if (gameManager && gameManager.playerHP <= 0) {
        showGameOver();
    }
}

function draw() {
    if (!gameManager) return;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gameManager.draw(ctx);

    // Draw HP bar
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, gameManager.playerHP * 2, 20);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function showGameOver() {
    gameOverOverlay.style.display = 'flex';
    window.cancelAnimationFrame(loop);
}

window.addEventListener('resize', resize);
init();
loop();
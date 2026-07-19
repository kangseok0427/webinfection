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
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

document.querySelector('.play-btn').addEventListener('click', () => {
    document.getElementById('ui-overlay').style.display = 'none';
    if (!gameManager) {
        init();
    } else {
        gameManager.start();
    }
    loop();
});

window.addEventListener('resize', resize);
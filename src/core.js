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
    if (gameManager && typeof gameManager.updateBounds === 'function') {
        gameManager.updateBounds(canvas.width, canvas.height);
    }
}

function init() {
    resize();
    gameManager = new GameManager(canvas.width, canvas.height);
    gameManager.initObjs();
    setupWebSocket();
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

function setupWebSocket() {
    const socket = new WebSocket('ws://example.com/game');

    socket.onopen = () => {
        console.log('Connected to the server');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (gameManager && typeof gameManager.handleMessage === 'function') {
            gameManager.handleMessage(data);
        }
    };

    socket.onclose = () => {
        console.log('Disconnected from the server');
    };
}

window.addEventListener('resize', resize);
init();
loop();
import GameManager from './GameManager.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let gameManager;
let updateLog = [];
let changeLog = [
    "Added HP bar display.",
    "Added '테스트' text in the center of the screen.",
    "Added version number display at top right.",
    "Added update log box at bottom left.",
    "Added log-like elements for player actions.",
    "Implemented character attributes and passive skills."
];

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
    updateLog.push(`Update at ${new Date().toLocaleTimeString()}`);
    if (updateLog.length > 10) {
        updateLog.shift();
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

    // Draw "테스트" text in the center
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('테스트', canvas.width / 2, canvas.height / 2);

    // Draw version number at top right
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText(`Version v4.5.2`, canvas.width - 10, 30);

    // Draw update log box
    ctx.fillStyle = '#222';
    ctx.fillRect(10, canvas.height - 150, 200, 140);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(10, canvas.height - 150, 200, 140);

    // Draw update log text
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    let y = canvas.height - 130;
    for (let log of updateLog) {
        ctx.fillText(log, 25, y);
        y -= 20;
    }

    // Draw change log box
    ctx.fillStyle = '#222';
    ctx.fillRect(220, canvas.height - 150, 300, 140);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(220, canvas.height - 150, 300, 140);

    // Draw change log text
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    y = canvas.height - 130;
    for (let change of changeLog) {
        ctx.fillText(change, 235, y);
        y -= 20;
    }

    // Draw player action logs
    ctx.fillStyle = '#222';
    ctx.fillRect(canvas.width - 220, canvas.height - 150, 200, 140);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(canvas.width - 220, canvas.height - 150, 200, 140);

    // Draw player action log text
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    y = canvas.height - 130;
    for (let action of gameManager.playerActions) {
        ctx.fillText(action, canvas.width - 215, y);
        y -= 20;
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
init();
loop();
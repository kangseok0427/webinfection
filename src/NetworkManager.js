import GameManager from './GameManager.js';

export default class NetworkManager {
    constructor() {
        this.socket = null;
        this.initSocket();
    }

    initSocket() {
        this.socket = io('http://localhost:3000'); // Replace with your server URL

        this.socket.on('connect', () => {
            console.log('Connected to the server');
        });

        this.socket.on('updateGameState', (data) => {
            GameManager.updateState(data);
        });
    }

    sendPlayerAction(action) {
        if (this.socket.connected) {
            this.socket.emit('playerAction', action);
        }
    }

    static updateState(data) {
        // Update game state based on received data
        // Example: Update positions of players, enemies, etc.
        console.log('Received game state update:', data);
    }
}
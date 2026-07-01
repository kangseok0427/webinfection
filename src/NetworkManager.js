import GameManager from './GameManager.js';

export default class NetworkManager {
    constructor() {
        // Initialize any non-websocket related properties here if needed
    }

    static updateState(data) {
        // Update game state based on received data
        // Example: Update positions of players, enemies, etc.
        console.log('Received game state update:', data);
    }
}
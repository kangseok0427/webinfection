import GameObject from './GameObject.js';

export default class Buff extends GameObject {
    constructor(x, y, type) {
        super(x, y, false);
        this.type = type;
        this.duration = 10; // Duration in seconds
    }

    applyBuff(character) {
        switch (this.type) {
            case 'speed':
                character.speed *= 1.5;
                break;
            case 'damage':
                character.damage += 20;
                break;
            case 'shield':
                character.shield = true;
                break;
            default:
                console.log('Unknown buff type');
        }
    }

    update(deltaTime) {
        this.duration -= deltaTime;
        if (this.duration <= 0) {
            // Remove the buff from the character
            this.active = false;
        }
    }
}
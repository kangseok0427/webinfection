import GameObject from './GameObject.js';

export default class Ability extends GameObject {
    constructor(x, y, name, description, effect) {
        super(x, y, false);
        this.name = name;
        this.description = description;
        this.effect = effect;
    }

    applyEffect(target) {
        if (this.effect) {
            this.effect(target);
        }
    }
}
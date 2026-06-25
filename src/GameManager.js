import Star from './obj/Star.js';

export default class GameManager {
    initObjs(width, height) {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push(new Star(Math.random() * width, Math.random() * height));
        }
        return stars;
    }
}
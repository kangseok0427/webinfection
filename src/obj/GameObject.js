export default class GameObject {
    constructor(x, y, hitEnable) {
        this.x = x;
        this.y = y;
        this.hitEnable = hitEnable;
        this.hitRadius = 0;
        this.needDestroy = false;
    }

    setHitRadius(radius) {
        this.hitRadius = radius;
        this.hitEnable = true;
    }

    handleHit(from) {
        // To be implemented by subclasses
    }
}
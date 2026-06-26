export default class GameObject {
    constructor(x, y, hitEnable) {
        this.x = x;
        this.y = y;
        this.hitEnable = hitEnable;
        this.hitRadius = 0;
        this.onHitEvent = null;
    }

    setHitRadius(radius) {
        this.hitRadius = radius;
        this.hitEnable = true;
    }

    handleHit(otherEntity) {
        if (this.onHitEvent) {
            this.onHitEvent(otherEntity.constructor.name);
        }
    }
}
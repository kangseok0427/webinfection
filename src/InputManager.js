export default class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        this.mousedown = false;

        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('mousedown', () => this.mousedown = true);
        window.addEventListener('mouseup', () => this.mousedown = false);
    }

    isKeyPressed(code) {
        return !!this.keys[code];
    }

    getMousePosition() {
        return this.mouse;
    }

    consumeMouseDown() {
        if (this.mousedown) {
            this.mousedown = false;
            return true;
        }
        return false;
    }
}
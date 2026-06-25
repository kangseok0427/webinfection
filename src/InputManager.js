class InputManager {
    constructor() {
        this.keys = {};
        this.backObjs = [];
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    initObjs(stars) {
        this.backObjs = [...stars];
    }

    isKeyPressed(code) {
        return !!this.keys[code];
    }
}

export default InputManager;
class Mouse {
    constructor(mousePosX, mousePosY, componentBoundToMouse) {
        this.mousePosX = mousePosX;
        this.mousePosY = mousePosY;
        // The component ghost bound to the mouse
        this.componentBoundToMouse = componentBoundToMouse;
        this.moved = false;
    }

    toggleMoved() {
        this.moved = !this.moved;
    }
}
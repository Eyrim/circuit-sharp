class ComponentGhost {
    constructor(mousePosX, mousePosY, componentID) {
        this.configuredGhost = configureComponentGhost(mousePosX, mousePosY);
        this.componentID = componentID;
    }

    static #configureComponentGhost() {
        // The translucent outline of the component, showing hovering
        let componentGhost = document.createElement("span");

        // Configures the ghost of the component
        componentGhost.className = componentID;
        componentGhost.style.top = mousePosY + "px";
        componentGhost.style.left = mousePosX + "px";
        componentGhost.id = componentID + ":" + getNumberOfComponents();
        componentGhost.id = componentID + ":" + getNumberOfComponents();
        componentGhost.style.filter = "opacity(50%)";


        return componentGhost;
    }

    static moveGhost(posX, posY) {
        this.configuredGhost.style.top = posY + "px";
        this.configuredGhost.style.left = posX + "px";
    }
}
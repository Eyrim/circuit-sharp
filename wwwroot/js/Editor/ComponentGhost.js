class ComponentGhost {
    constructor(mousePosX, mousePosY, componentID) {
        this.configuredGhost = this.configureComponentGhost(mousePosX, mousePosY);
        this.componentID = componentID;
        this.className = undefined;
    }

    setClassName(data) {
        this.className = data[this.componentID];
    }

    getClassNameFromComponentID() {
        fetch('https://localhost:44338/Editor/ComponentToIDMapJSON')
            .then(response => response.json())
            .then(data => setClassName(data));
    }

    configureComponentGhost(mousePosX, mousePosY) {
        // The translucent outline of the component, showing hovering
        let componentGhost = document.createElement("div");

        // Configures the ghost of the component
        componentGhost.className = this.componentID;
        componentGhost.style.top = mousePosY + "px";
        componentGhost.style.left = mousePosX + "px";
        componentGhost.style.className = this.className;
        componentGhost.id = this.componentID;
        componentGhost.style.filter = "opacity(50%)";


        return componentGhost;
    }

    moveGhost(posX, posY) {
        this.configuredGhost.style.top = posY + "px";
        this.configuredGhost.style.left = posX + "px";
    }
}
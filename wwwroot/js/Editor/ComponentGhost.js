class ComponentGhost {

    // The URL to GET the ComponentIDMap from the controller
    #componentIDMapURL = 'https://localhost:44338/Editor/ComponentToIDMapJSON';

    constructor() {
        // The ghost
        this.configuredGhost = undefined;
        this.componentID = undefined;
        this.className = undefined;
    }

    /*
     * Sets the componentID of the ghost
     */ 
    setComponentID(componentID) {
        this.componentID = componentID;
    }

    /*
     * Sets the className of the ghost
     */ 
    setClassName() {
        // If the componentID is undefined, the className can't be found
        if (this.componentID == undefined) {
            throw new ComponentIDUndefinedException("There must be a defined ComponentGhost.ComponentID in order to set the class name");
        } else {
            // Sets the className to the correct name
            this.className = this.#getClassNameFromComponentID();
        }
    }

    /*
     * Gets the className from this.componentID
     */
    #getClassNameFromComponentID() {
        let worker = new Worker("/js/Editor/Workers/GetComponentToIDMapWorker.js");

        worker.onmessage = (event) => {
            return event.data[this.componentID];
        }
    }

    /*
     * Configures the componentGhost
     */ 
    configureComponentGhost(mousePosX, mousePosY) {
        // The translucent outline of the component, showing hovering
        let componentGhost = document.createElement("div");

        // Configures the ghost of the component
        componentGhost.className = this.className;
        componentGhost.style.top = mousePosY + "px";
        componentGhost.style.left = mousePosX + "px";
        componentGhost.id = this.componentID;
        componentGhost.style.filter = "opacity(50%)";


        this.configuredGhost = componentGhost;
    }

    /*
     * Moves the ghost to a new position
     */ 
    moveGhost(posX, posY) {
        this.configuredGhost.style.top = posY + "px";
        this.configuredGhost.style.left = posX + "px";
    }
}
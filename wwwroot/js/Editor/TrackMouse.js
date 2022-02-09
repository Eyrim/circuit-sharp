document.addEventListener('mousemove', (event) => {
    //TODO: Declare bounds for if mouse moves when not over schem area
    //TODO: Declare checking for if no ghost bound to mouse, enter hover select mode
    // circuit-diagram.org when v pressed
    let mouse = new Mouse(event.clientX, event.clientY, undefined);
    console.log(mouse.mousePosX);
    console.log(event.clientX);

    if (mouse.componentBoundToMouse == undefined) {
        // Draws the ghost
        drawComponentGhost();
    } else {
        mouse.componentBoundToMouse.moveGhost(mouse.mousePosX, mouse.mousePosY);
    }

    // Sees if the mouse has moved once
    if (this.moved == false) {
        mouse.toggleMoved();
    }

    function drawComponentGhost() {
        //TEMP DEBUG
        let componentID = "0";
        
        // The ghost
        let componentGhost = new ComponentGhost(mouse.mousePosX, mouse.MousePosY, componentID);

        // The div representing the active schematic area
        let componentContainer = document.getElementById("activeSchematicArea"); //TODO: Populate

        // If there is no componentGhost bound to the mouse, bind one
        if (mouse.componentBoundToMouse == undefined) {
            mouse.componentBoundToMouse = componentID;
        }


        // If the current mouse position doesn't match the set properties in mouse
        if (mouse.mousePosY != event.clientY ||
            mouse.mousePosX != event.clientX) {

            this.mousePosX = event.clientX;
            this.mousePosY = event.clientY;
        }

        // Adds the component to the DOM
        componentContainer.appendChild(componentGhost.configuredGhost);
    }

    function dropComponent() {

    }
});


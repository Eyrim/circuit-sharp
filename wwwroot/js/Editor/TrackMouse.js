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

    function drawComponentGhost() {
        // The ghost
        let componentGhost = new ComponentGhost(mouse.mousePosX, mouse.MousePosY);

        // The div representing the active schematic area
        let componentContainer = document.getElementById(""); //TODO: Populate

        // If there is no componentGhost bound to the mouse, bind one
        if (mouse.componentBoundToMouse == undefined) {
            mouse.componentBoundToMouse = componentID;
        }

        // Adds the component to the DOM
        componentContainer.appendChild(componentGhost);
    }

    function dropComponent() {

    }
});


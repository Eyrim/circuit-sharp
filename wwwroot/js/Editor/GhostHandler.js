'use strict';

/*
 * ComponentID unique to each individual element
 * 
 * ComponentTypeID is NOT unique:
 *  - It is unique to each TYPE of component:
 *      - I.E. Resitor, Variable Resistor, Wire, Capacitor, etc.
 *      
 * 
 * 
 * 
 */ 


/*
 * Gets the number of components that have been placed
 */
function getNumberOfComponentsInActiveArea() {
    // Get the active schematic area
    let activeAreaEl = document.getElementById("activeSchematicArea");

    // Returns the number of children in active AreaEl
    return activeAreaEl.childElementCount;
}


/*
 * Draws a component ghost
 */
function drawComponentGhost(mousePosX, mousePosY, componentID, componentTypeID) {
    // The active schematic area
    let activeAreaEl = document.getElementById("activeSchematicArea");

    // The component ghost I will be adding to the document
    let componentGhost = document.createElement("div");

    componentGhost.className = "component-" + componentTypeID;
    componentGhost.style.top = mousePosY + "px";
    componentGhost.style.left = mousePosX + "px";
    componentGhost.id = "component-" + componentID;
    componentGhost.style.filter('opacity(50%)');

    activeAreaEl.appendChild(componentGhost);

    //TODO: Tell Editor Model to add one component with the correct position, type etc.
}


/*
 * Checks if the mouse is currently over the active schematic area
 */
function checkIfMouseInActiveArea(mousePosX, mousePosY) {
    // Get active area element
    let activeAreaEl = document.getElementByID("activeSchematicArea");

    // Get rect of active area
    let activeAreaRect = activeAreaEl.getBoundingClientRect();

    // Adds the mouse coordinates together
    let mousePosCompositeCoordinate = mousePosX + mousePosY;

    // Adds the width and height of the rect together
    let activeAreaRectCompositeCoordinate = activeAreaRect.width + activeAreaRect.height;

    // If the mouse is in the rect, return true:
        // See documentation for how this actually works
    if (mousePosCompositeCoordinate <= activeAreaRectCompositeCoordinate) {
        return true;
    } else {
        return false;
    }
}


/*
 * Removes a component with a given ComponentID
 */
function removeComponentByID(componentID) {
    // The active schematic area
    let activeAreaEl = document.getElementById("activeSchematicArea");

    // Get every element in that area
    let components = activeAreaEl.children;

    // For every placed component
    for (let i = 0; i < components.length; i++) {
        // If the component's ID is the one we're looking for
        if (components[i].id === componentID) {
            // remove it
            components[i].remove();

            break;
        }
    }
}


function componentButtonClicked() {

}

/*
 * Check Stack Overflow question on button event listeners
 * 
 * Using the code below will mean it's really hard to get which component the user clicked
 * It's just generally flawed
 */ 

/*
// Detect mouse click on button of component
document.addEventListener('mousedown', (event) => {
    // The ID of the component being ghosted
        // Gotten from the number of components in the area
    let componentID = getNumberOfComponentsInActiveArea();

    //TMP: For testing
        // Real TypeID will be gotten from the button ID
    let componentTypeID = "1";

    // If mouse not over active schematic area
    if (!(checkIfMouseInActiveArea(event.clientX, event.clientY))) {
        // Draw a ghost of the component
        drawComponentGhost(event.clientX, event.clientY, componentID, componentTypeID);

        // Every time the mouse moves after the first drawing
        document.addEventListener('mousemove', (event) => {
            // Remove the component ghost we're dealing with
            removeComponentByID(componentID);

            // Redraw the ghost in the new mouse position
            drawComponentGhost(event.clientX, event.clientY, componentID, componentTypeID);
        })
    }
    // If the mouse is in the active area, then 
    else if (checkIfMouseInActiveArea(event.clientX, event.clientY)) {
        drawComponent(event.clientX, event.clientY, componentID, componentTypeID);
    }
})
*/

// Detect second click to release component
    // If click when over active schematic area
    // And component ghost is being drawn
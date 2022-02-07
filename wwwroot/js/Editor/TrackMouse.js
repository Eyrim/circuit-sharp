function drawComponent(mousePosX, mousePosY, componentID) {
    // The div representing the active schematic area
    let componentContainer = document.getElementById(""); //TODO: Populate

    // The translucent outline of the component, showing hovering
    let componentGhost = document.createElement("span");
    componentGhost.className(componentID);
    componentGhost.style.top = mousePosY + "px";
    componentGhost.style.left = mousePosX + "px";
    componentGhost.id = componentID + GetNumberOfComponents();
}
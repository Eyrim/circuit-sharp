window.onload = () => {
    fallback.load({
        jQuery: [
            // Google's CDN
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // 
            "https://localhost:44338/lib/jquery/dist/jquery.js"
        ]
    });


    fallback.ready(['jQuery'], function (jQuery) {
        console.log("Loaded jQuery");

        "use strict";

        /*
            * ComponentID unique to each individual element
            * 
            * ComponentTypeID is NOT unique:
            *  - It is unique to each TYPE of component:
            *      - I.E. Resitor, Variable Resistor, Wire, Capacitor, etc.
            *      
            * 
            * ISSUES:
            * todo:
            * -----
            * ComponentIDs not working properly, run and see the div
            * 
            */


        /*
        * When a component image is clicked
        */
        {
            // The button container
            let componentButtonContainerEl = document.getElementById("componentButtonContainer");

            // When the button container is clicked on
            $(componentButtonContainerEl).click((event) => {
                // Stop other things in the site taking over control of the event
                event.stopPropagation();

                // The full componentTypeID of the component clicked on
                let componentTypeID = event.target.id;

                componentTypeID = getTypeIDFromComponentID(componentTypeID);

                drawComponentGhost(componentTypeID);
            });
        }


        /*
         * Gets the actual ID from the componentID gathered from the DOM
         */
        function getTypeIDFromComponentID(componentTypeID) {
            // The ID will come in `component-x` format
            // This gets the numerical ID 
            let id = componentTypeID.split("-");

            // Returns the numerical ID
            return id[1];
        }


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
        * Gets the URl of the component image from the type ID
        */
        function getImgUrlFromTypeID(typeID) {
            let worker = new Worker("/js/Editor/Workers/GetImgUrlFromTypeID.js");

            worker.onmessage = (event) => {
                let data = event.data;

                return data[typeID];
            }

            worker.terminate();
        }


        /*
        * Draws a component ghost
        */
        function drawComponentGhost(componentTypeID) {
            // Get every time the mouse moves from this point on
            document.addEventListener('mousemove', (event) => {

                // If the mouse is in the active schematic area
                if (checkIfMouseInActiveArea(event.clientX, event.clientY)) {
                    // The active schematic area
                    let activeAreaEl = document.getElementById("activeSchematicArea");

                    // The component ghost I will be adding to the document
                    let componentGhost = document.createElement("img");

                    componentGhost.src = getImgUrlFromTypeID(componentTypeID);
                    componentGhost.style.top = event.clientY + "px";
                    componentGhost.style.left = event.clientX + "px";
                    componentGhost.style.filter = 'opacity(50%)';

                    activeAreaEl.appendChild(componentGhost);
                    activeAreaEl.removeChild(componentGhost);
                }
            });

            //TODO: Tell Editor Model to add one component with the correct position, type etc.
        }


        /*
            * Checks if the mouse is currently over the active schematic area
            */
        function checkIfMouseInActiveArea(mousePosX, mousePosY) {
            // Get active area element
            let activeAreaEl = document.getElementById('activeSchematicArea');

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
    });
}
﻿//TODO: Re-write this entire file in typescript :(

'use strict';

window.onload = () => {
    fallback.load({
        jQuery: [
            // Google's CDN
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // Local fallback
            "https://localhost:44338/lib/jquery/dist/jquery.js"
        ]
    });

    // When jQuery is loaded
    fallback.ready(['jQuery'], (jQuery) => {
        console.log("Loaded jQuery");

        // The container with the buttons to spawn an element within them
        const componentButtonContainer = document.getElementById("componentButtonContainer");
        const activeSchematicArea = document.getElementById("activeSchematicArea");
        
        // When an element in the button container is clicked
        $(componentButtonContainer).click(async (event) => {

            // If the clicked element is a button
            if (event.target.tagName == "BUTTON") {

                // Used to iterate over the ghosts being trailed
                let ghostCounter = 0;
                // The url of the img src
                let imgUrl = 'https://localhost:44338/Editor/GetImgUrlFromTypeID?TypeID=' + getTypeIDFromElID(event.target.id);

                // Previous mouse positions
                    // Used to detect if first click or not
                let prevMouseX = undefined;
                let prevMouseY = undefined;

                const mouseMoveCallbackFunc = function (event) {
                    if (prevMouseX == undefined || prevMouseY == undefined) {
                        // Set previous mouse move
                        prevMouseX = event.clientX;
                        prevMouseY = event.clientY;
                    } else {
                        // Remove the ghost drawn by the last mouse movement
                        // Only if this isn't the first mouse movement
                        removeComponentGhostByID(ghostCounter, activeSchematicArea);
                    }

                    drawComponentGhost(event.clientX, event.clientY, imgUrl, ghostCounter, activeSchematicArea);

                    ghostCounter += 1;
                }

                console.log("Component Button ${event.target.id} cicked");
                event.stopPropagation();

                //TODO: Validate this for if the mouse was clicked within the active area
                    // For testing, the active area is the entire page, but this will change in Prod
                // When the user clicks while a ghost is drawn on the mouse position
                document.addEventListener('click', (event, imgUrl) => {
                    placeComponent(event.clientX, event.clientY, getImgUrlFromParent(activeSchematicArea), ghostCounter, activeSchematicArea);
                    removeComponentGhostByID(ghostCounter, activeSchematicArea);

                    document.removeEventListener('mousemove', mouseMoveCallbackFunc);//TODO: FIX
                })

                // Every time the mouse moves
                document.addEventListener('mousemove', mouseMoveCallbackFunc);
            }
        })

        function getImgUrlFromParent(parent) {
            /*
            let el = document.getElementById(id);

            if (el.tagName === "IMG") {
                return el.src;
            } else {
                throw new Error("Element was not IMG, couldn't retrieve src");
            }
            */
            let children = parent.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].nodeName === "IMG") {
                    return children[i].currentSrc;
                }
            }
        }

        function placeComponent(xPos, yPos, imgUrl, id, parent) {
            //TODO: Send message to controller to alert model

            let component = document.createElement('img');
            component.src = imgUrl;
            component.style.left = xPos + "px";
            component.style.top = yPos + "px";
            component.id = id;
            component.className = "component";

            parent.appendChild(component);
        }

        function getTypeIDFromElID(id) {
            return id.split("-")[1];
        }

        function drawComponentGhost(xPos, yPos, url, id, parent) {
            let ghost = document.createElement('img');
            ghost.src = url;
            ghost.style.left = xPos + "px";
            ghost.style.top = yPos + "px";
            ghost.id = id;
            ghost.className = "component";
            ghost.style.opacity = "80%";

            parent.appendChild(ghost);
        }

        function removeComponentGhostByID(id, parent) {
            // The last element drawn
            id -= 1;
            let el = document.getElementById(id);

            // Remove the last element
            parent.removeChild(el);
        }
    })
}
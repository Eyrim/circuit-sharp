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

                console.log("Component Button ${event.target.id} cicked");
                event.stopPropagation();

                // Every time the mouse moves
                document.addEventListener('mousemove', (event) => {
                    if (prevMouseX == undefined || prevMouseY == undefined) {
                        // Set previous mouse move
                        prevMouseX = event.clientX;
                        prevMouseY = event.clientY;
                    } else {
                        // Remove the ghost drawn by the last mouse movement
                            // Only if this isn't the first mouse movement
                        removeComponentGhostByID(ghostCounter, componentButtonContainer);
                    }

                    drawComponentGhost(event.clientX, event.clientY, imgUrl, ghostCounter, componentButtonContainer);

                    ghostCounter += 1;
                })
            }
        })

        function getTypeIDFromElID(id) {
            return id.split("-")[1];
        }

        function drawComponentGhost(xPos, yPos, url, id, parent) {
            let ghost = document.createElement('img');
            ghost.src = url;
            ghost.style.left = xPos + "px";
            ghost.style.top = yPos + "px";
            ghost.id = id;

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
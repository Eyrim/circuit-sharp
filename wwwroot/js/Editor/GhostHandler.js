'use strict';

window.onload = () => {
    // Configure Fallback.js
    fallback.load({
        jQuery: [
            // Google's CDN
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // 
            "https://localhost:44338/lib/jquery/dist/jquery.js"
        ]
    });

    function sleep(ms) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < ms);
    }

    fallback.ready(['jQuery'], (jQuery) => {
        console.log("Loaded jQuery");

        // When a component Button is clicked
        let componentButtonContainerEl = document.getElementById("componentButtonContainer");

        // When an element within this container is clicked
        $(componentButtonContainerEl).click(async (event) => {
            console.log(event.target.id);
            event.stopPropagation();

            // The componentID
            let componentTypeID = getTypeIDFromComponentID(event.target.id);

            {
                
                let imgUrl = 'https://localhost:44338/Editor/GetImgUrlFromTypeID?TypeID=' + componentTypeID;

                let ghostCounter = 0;

                document.addEventListener('mousemove', (event) => {
                    drawComponentGhost(event.clientX, event.clientY, imgUrl, ghostCounter);
                    sleep(100);
                    removeComponentGhost(ghostCounter);
                    ghostCounter += 1;
                    console.log("drawn and removed a component");
                })
                /*
                let typeIdToImgUrlWorker = new Worker("/js/Editor/Workers/GetImgURLFromTypeID.js");

                // Gets the img url for the type of element
                typeIdToImgUrlWorker.onmessage = (event) => {
                    console.log("Worker sent message and was recieved");
                    let imgUrl = event.data[componentTypeID];
                    console.log(imgUrl);
                    let ghostCounter = 0;

                    document.addEventListener('mousemove', (event) => {
                        console.log("pls");
                        drawComponentGhost(event.clientX, event.clientY, imgUrl, ghostCounter);
                        //removeComponentGhost(ghostCounter);
                        ghostCounter += 1;
                        console.log("drawn and removed a component");
                    })
                }
                */
                
            }
        })

        function drawComponentGhost(xPos, yPos, url, id) {
            let activeAreaEl = document.getElementById('activeSchematicArea');
            let ghost = document.createElement('img');
            ghost.src = url;
            ghost.style.left = xPos + "px";
            ghost.style.top = yPos + "px";
            ghost.id = id;

            activeAreaEl.appendChild(ghost);
        }

        function removeComponentGhost(id) {
            let activeAreaEl = document.getElementById('activeSchematicArea');
            activeAreaEl.removeChild(document.getElementById(id));
        }

        function getTypeIDFromComponentID(id) {
            return id.split("-")[1];
        }
    });
}
//TODO: Re-write this entire file in typescript :(

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
        const activeAreaTable = document.getElementById("activeSchematicAreaTable");


        const getTableRows = function () {
            const els = document.getElementById("activeSchematicAreaTable");
            let tableRows = [];

            //TODO: Unhardcode this
            for (let i = 0; i < 5; i++) {
                tableRows.push(els.children[0].children[i]);
            }

            // One row
            //console.log(els.children[0].children[0]);
            return tableRows;
        }
        const getTypeIDFromElID = function (id) {
            return id.split("-")[1];
        }
        const drawComponentGhost = function (xPos, yPos, url, id, parent) {
            let ghost = document.createElement('img');
            ghost.src = url;
            ghost.style.left = xPos + "px";
            ghost.style.top = yPos + "px";
            ghost.id = id;
            ghost.className = "component";
            ghost.style.opacity = "80%";
            ghost.style.zIndex = "9999999";

            parent.appendChild(ghost);
        }
        const removeComponentGhostByID = function (id, parent) {
            // The last element drawn
            id -= 1;
            let el = document.getElementById(id);

            // Bandaid solution, not proud of it but I'm desperate 
            if (el != undefined) {
                // Remove the last element
                parent.removeChild(el);
            }
        }
        const sleep = function (milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        } /* https://www.sitepoint.com/delay-sleep-pause-wait/ */
        const attachMousemoveHandlers = function (els, imgUrl) {
            let testID = 0;
            $("#activeSchematicAreaTable").mousemove((event) => {
                //event.target.id

                if (event.target.id != "activeSchematicAreaTable") {
                    drawComponentGhost(event.clientX, event.clientY, imgUrl, testID, document.getElementById(event.target.id));
                    sleep(100);
                    removeComponentGhostByID(testID, document.getElementById(event.target.id));
                    testID++;
                }
            })

            /*
            let id = "";
            let testID = 0;

            // For every row
            for (let i = 0; i < els.length; i++) {
                // For every data
                for (let j = 0; j < els[i].children.length; j++) {
                    id = "#" + els[i].id;
                    $(id).mousemove((event) => {
                        drawComponentGhost(event.clientX, event.clientY, imgUrl, testID, els[i]);
                        removeComponentGhostByID(testID, els[i]);
                        testID++;
                    });
                }
            }
            */
        }


        // 2d array to store the table rows and their data
        let table = getTableRows();

        // When an element in the component button container is clicked
        $(componentButtonContainer).click(async (event) => {
            // If the element was a button
            if (event.target.tagName == "BUTTON") {
                let typeID = getTypeIDFromElID(event.target.id);

                let imgUrl = 'https://localhost:44338/Editor/GetImgUrlFromTypeID?TypeID=' + typeID;

                attachMousemoveHandlers(table, imgUrl);
            }
        })
    })
}
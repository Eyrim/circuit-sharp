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

        let typeID = "";


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

        const populateTableRows = function () {
            let rows = getTableRows();
            let children;
            let el;

            for (let i = 0; i < rows.length; i++) {
                children = rows[i].children;

                for (let j = 0; j < children.length; j++) {
                    el = document.createElement('IMG');
                    el.src = `https://localhost:44338/Images/Transparent`;

                    children[j].appendChild(el);
                }
            }
        }
        
        const removePlacedComponentsInCell = function (id) {
            console.log("Removing components from: " + id);

            let parent = document.getElementById(id);
            let children = parent.children;

            

            for (let i = 0; i < children.length; i++) {
                console.log("children[i].id = " + children[i].id);

                if (children[i].id.split('-')[0] === "placedComponent") {
                    parent.removeChild(children[i]);
                    console.log("Removed");
                }
            }
        }

        const drawComponent = function (id, toAdd) {
            let container = document.getElementById(id);
            let el = document.createElement('img');
            let url = `https://localhost:44338/Images/`;

            switch (typeID) {
                case "0":
                    url += "GenericResistor";
                    break;

                case "1":
                    url += "Wire";
                    break;

                default:
                    console.log("Failed");
            }

            el.src = url;
            el.id = toAdd;
            el.style.zIndex = "9999999";
            el.style.filter = "opacity(75%)";

            container.appendChild(el);
        }

        const enterHandler = function (event) {
            if (document.getElementById(event.currentTarget.id).children.length >2) {
                try {
                    document.getElementById(event.currentTarget.id).removeChild(document.getElementById("placedComponent-" + typeID)); //HERE
                } catch {
                }
            } else {
                drawComponent(event.currentTarget.id, "GhostTest");
            }
        }
        const leaveHandler = function (event) {
            try {
                document.getElementById(event.currentTarget.id).removeChild(document.getElementById("GhostTest")); //HERE
            } catch {
            }
        }
        const mouseDownHandler = function (event) {
            // Remove other components with id starting with "placedcomponent"
            removePlacedComponentsInCell(event.currentTarget.id); // Evaluating to the id of the parent

            // Draw new component
            placeComponent(event.currentTarget.id, "placedComponent-" + typeID);
            console.log("Placed in: " + event.currentTarget.id);
        }

        const placeComponent = function (parentID, elID) {
            let container = document.getElementById(parentID);
            // Draw Component
            let el = document.createElement('img');
            let url = `https://localhost:44338/Images/`;

            switch (typeID) {
                case "0":
                    url += "GenericResistor";
                    break;

                case "1":
                    url += "Wire";
                    break;

                default:
                    console.log("Failed to get place url");
                    break;
            }

            el.src = url;
            el.id = elID;
            el.style.zIndex = "9999999";

            container.appendChild(el);
        }

        const attachHandlers = function () {
            // Attaches mousemove listeners
            for (let i = 0; i <= 24; i++) {
                document.getElementById(i).addEventListener("mouseenter", enterHandler);
                document.getElementById(i).addEventListener("mouseleave", leaveHandler);
                document.getElementById(i).addEventListener("mousedown", mouseDownHandler);
            }
        }

        const imgClicked = function (event) {
            typeID = event.target.id.split('-')[1];

            attachHandlers();
        }

        const mainLoop = function () {
            for (let i = 0; i < 4; i++) {
                $("#component-" + i).click(imgClicked);
            }
        }

        populateTableRows();
        mainLoop();
    })
}
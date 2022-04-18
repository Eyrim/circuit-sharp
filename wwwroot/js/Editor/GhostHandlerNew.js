"use strict";

window.onload = () => {
    fallback.load({
        jQuery: [
            // Google's CDN
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // Local fallback
            "http://localhost:8001/lib/jquery/dist/jquery.js"
        ]
    });

    // When jQuery is loaded
    fallback.ready(['jQuery'], (jQuery) => {
        console.log("Loaded jQuery");

        main();

        let typeID = "";
        let placedNum = 0;
        let value = 0;

        function main() {
            attachComponentAreaHandlers();
        }

        function attachComponentAreaHandlers() {
            console.log("Attaching Component Area Handlers");
            for (let i = 0; i <= 7; i++) {
                $("#component-" + i).click(imgClickedHandler);
            }
        }

        function imgClickedHandler(event) {
            typeID = event.target.id.split('-')[1];

            attachSchematicAreaHandlers();
        }

        function attachSchematicAreaHandlers() {
            console.log("Attaching Schematic Area Handlers");
            // Attaches schematicArea listeners
            for (let i = 0; i <= 24; i++) {
                document.getElementById(i).addEventListener("mousedown", mouseDownHandler); //TODO: REFACTOR TO jQUERY
            }
        }

        function mouseDownHandler(event) {
            console.log(event);
            if (event.target.tagName.toLowerCase() == "img") { return; }

            console.log("Clicked on: " + event.target.id);
            console.log("TypeID: " + typeID);

            let numInContainer = event.target.childElementCount;

            if (numInContainer >= 1) { removePlacedFromID(event.target.id); }

            placeComponent(event.target.id);
        }

        function removePlacedFromID(parentID) {
            console.log("Removing Placed");
            let parent = document.getElementById(parentID);
            let children = parent.children;

            for (let i = 0; i < parent.childElementCount; i++) {
                if (children[i].id.split('-')[0] == "PlacedComponent") {
                    parent.removeChild(children[i]);
                }
            }
        }

        function placeComponent(parentID) {
            let parent = document.getElementById(parentID);
            let element = document.createElement('img');
            let url = getURLFromTypeID();

            element.src = url;
            element.id = "PlacedComponent-" + placedNum;
            element.style.zIndex = "999";

            parent.appendChild(element);

            notifyControllerOfPlace(element);
            placedNum += 1;
            console.log("Appended to: " + parentID);
        }

        function notifyControllerOfPlace(element) {
            let url = `http://localhost:8001/API/PlaceComponent?`;
            url += `typeID=${typeID}&`;
            url += `parentElementID=${element.parentElement.id}`;

            $.ajax({
                type: "POST",
                url: url,
                data: "",
                success: () => {
                    console.log("Successful POST");
                },
                dataType: "text"
            });
        }

        function getURLFromTypeID() {
            let url = "http://localhost:8001/Images/ComponentImage?TypeID=";

            return url + typeID; 
        }
    });
}
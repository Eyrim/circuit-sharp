"use strict";

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

        main();

        let typeID = "";
        let placedNum = 0;
        let value = 0;

        function main() {
            attachComponentAreaHandlers();
        }
/*
        function getTableRows () {
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

        function populateTableRows () {
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
        }*/

        function attachComponentAreaHandlers() {
            console.log("Attaching Component Area Handlers");
            for (let i = 0; i < 4; i++) {
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
            let url = `https://localhost:44338/API/PlaceComponent?`;
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


            /*fetch('https://localhost:44338/API/PlaceComponent')
                .then(response => {
                    if (!response.ok) { throw new Error("Failed to fetch;"); }
                }).catch(error => {
                    console.log(error);
                })*/
            /*let xhr = new XMLHttpRequest();
            xhr.open("POST", "https://localhost:44338/API/PlaceComponent");

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = () => {
                console.log(xhr.status);
            }

            let data = `{
                "typeID": ${typeID},
                "parentElementID": ${element.parentElement.id},
                "value": ${value}
            }`;

            console.log(xhr);
            xhr.send(data);*/
        }

        function getURLFromTypeID() {
            let url = "https://localhost:44338/Images/";

            switch (typeID) {
                case '0':
                    url += "GenericResistor";
                    break;

                case '1':
                    url += "Wire";
                    break;

                default:
                    throw new Error("Could not find URL to place component");
            }

            return url;
        }
    });
}
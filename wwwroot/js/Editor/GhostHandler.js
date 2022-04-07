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
                    el.src = `https://localhost:44338/Images/TransparentImg`;

                    children[j].appendChild(el);
                }
            }
        }

        const removePlacedComponentsInCell = function (id) {
            let parent = document.getElementById(id);
            let children = parent.children;

            for (let i = 0; i < children.length; i++) {
                if (children[i].id.split('-')[0].toLowerCase() == "placed") {
                    parent.removeChild(children[i]);
                }
            }
        }

        const drawComponent = function (id, toAdd) {
            let container = document.getElementById(id);
            let el = document.createElement('img');
            let url = `https://localhost:44338/Editor/GenericResistorImg`;

            el.src = url;
            el.id = toAdd;
            el.style.zIndex = "9999999";
            el.style.filter = "opacity(50%)";

            container.appendChild(el);
            console.log("appended component");
        }

        const enterHandler = function (event) {
            if (document.getElementById(event.currentTarget.id).tagName != "IMG") {
                if (document.getElementById(event.currentTarget.id).children.length > 1) {
                    try {
                        document.getElementById(event.currentTarget.id).removeChild(document.getElementById("Boop")); //HERE
                    } catch {
                    }
                } else {
                    console.log("Entered: " + event.currentTarget.id);
                    drawComponent(event.currentTarget.id, "GhostTest");
                }
            }
        }
        const leaveHandler = function (event) {
            console.log("Left: " + event.currentTarget.id);
            try {
                document.getElementById(event.currentTarget.id).removeChild(document.getElementById("GhostTest")); //HERE
            } catch {
            }
        }

        const mouseDownHandler = function (event) {
            // Remove other components with id starting with "placed"
            removePlacedComponentsInCell(event.currentTarget.id);

            console.log("Clicked: " + event.currentTarget.id);
            // Draw new component
            placeComponent(event.currentTarget.id, "placed-1");
        }

        const placeComponent = function (parentID, typeID) {
            let container = document.getElementById(parentID);
            // Draw Component
            let el = document.createElement('img');
            let url = `https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png`;

            el.src = url;
            el.id = typeID;
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

        populateTableRows();
        attachHandlers();
    })
}
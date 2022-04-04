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
                    el.src = `https://localhost:44338/Editor/TransparentImg`;

                    children[j].appendChild(el);
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
            console.log("Entered: " + event.currentTarget.id);
            drawComponent(event.currentTarget.id, "testID");
        }
        const leaveHandler = function (event) {
            console.log("Left: " + event.target.id);
            document.getElementById(event.target.id).removeChild(document.getElementById("testID"));
        }

        const mouseDownHandler = function (event) {
            console.log("Clicked: " + event.currentTarget.id);

            placeComponent(event.currentTarget.id);
        }

        const placeComponent = function (parentID, typeID) {
            let container = document.getElementById(parentID);

            if (container.childElementCount > 2) {
                for (let i = 0; i < container.children.item(0))
            }

            let el = document.createElement('img');
            console.log(el);
            let url = `https://localhost:44338/Editor/GenericResistorImg`;

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
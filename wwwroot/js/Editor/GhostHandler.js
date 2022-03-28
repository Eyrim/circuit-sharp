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

        const attachMouseMoveHandlers = function (els) {
            let testID = 0;
            let currentlyOver;
            let previouslyOver;
            let drawn = false;

            $("#activeSchematicAreaTable").mousemove((event) => {
                event.stopPropagation();
                if (event.target.id != "activeSchematicAreaTable") {
                    if (!(drawn)) {
                        // Draw component
                        drawComponent(event.target.id, testID);
                        drawn = true;
                        currentlyOver = event.target.id;
                    }

                    if (currentlyOver != event.target.id) {
                        // Remove component
                        removeComponent(event.target.id, testID);
                    }
                }
            })
        }

        const removeComponent = function (id, toRemove) {
            let parent = document.getElementById(id);
            let children = parent.children;
            //toRemove -= 1;

            for (let i = 0; i < children.length; i++) {
                if (children[i].id == toRemove) {
                    parent.removeChild(children[i]);
                    console.log("removed component");
                    return;
                }
            }
        }

        const sleep = function (milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        } /* https://www.sitepoint.com/delay-sleep-pause-wait/ */

        const drawComponent = function (id, toAdd) {
            let container = document.getElementById(id);
            let el = document.createElement('img');
            let url = `https://localhost:44338/Editor/GenericResistorImg`;

            el.src = url;
            el.id = toAdd;
            el.style.zIndex = "9999999";

            container.appendChild(el);
            console.log("appended component");
        }

        attachMouseMoveHandlers(getTableRows());

    })
}
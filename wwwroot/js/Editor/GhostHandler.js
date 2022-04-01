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

        const populateTableRows = function () {
            let rows = getTableRows();
            let children;
            let el;

            for (let i = 0; i < rows.length; i++) {
                children = rows[i].children;

                for (let j = 0; j < children.length; j++) {
                    el = document.createElement('div');
                    el.className = "emptyComponent";

                    children[j].appendChild(el);
                }
            }
        }


        // https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/#:~:text=Child%20nodes%20can%20be%20removed,which%20produces%20the%20same%20output. theft :D
        const removeAllChildren = function (parentID) {
            var e = document.getElementById(parentID);

            //e.firstElementChild can be used.
            var child = e.firstElementChild;
            while (child) {
                e.removeChild(child);
                child = e.firstElementChild;
            }
        }

        const attachMouseMoveHandlers = function (els) {
            let testID = 0;
            let currentlyOver;
            let previouslyOver;
            let drawnOver;
            let drawn = false;

            $("#activeSchematicAreaTable").mousemove((event) => {
                event.stopPropagation();
                if (event.target.id != "activeSchematicAreaTable" && event.target.tagName != "IMG") {
                    console.log("Target ID: " + event.target.id);
                    //currentlyOver = event.target.id;
                    if (!(drawn)) {
                        removeAllChildren(event.target.id);
                        // Draw component
                        drawComponent(event.target.id, testID);
                        drawn = true;
                        drawnOver = event.target.id;
                    }

                    if (drawnOver != event.target.id) {
                        // Remove component
                        removeAllChildren(event.target.id);
                        populateTableRows();
                        //removeComponent(event.target.id, testID);
                        drawn = false;
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
            el.style.filter = "opacity(50%)";

            container.appendChild(el);
            console.log("appended component");
        }


        populateTableRows();
        attachMouseMoveHandlers(getTableRows());

    })
}

/* Fiddle
 * 
 * const removeAllChildren = function(parentID) {
  var e = document.getElementById(parentID);

  //e.firstElementChild can be used.
  var child = e.firstElementChild;
  while (child) {
    e.removeChild(child);
    child = e.firstElementChild;
  }
}
const drawComponent = function(parentID, IDToAdd) {
  let container = document.getElementById(parentID);
  let el = document.createElement('img');
  let url = `https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.png`;

  el.src = url;
  el.id = IDToAdd;
  el.style.zIndex = "9999999";
  el.style.filter = "opacity(50%)";

  container.appendChild(el);
  console.log("appended component");
}

$("#activeSchematicAreaTable").mousemove((event) => {
  event.stopPropagation();
  console.log("Mouse moved on: " + event.target.id);

  let currentElementInData;
  let lastDrawnOn;

  // If mouse moved on table data
  if (event.target.id != "activeSchematicAreaTable" && event.target.tagName != "IMG") {
    // Save current element in data
    currentElementInData = event.target.children[0];

    // Remove current element in data
    removeAllChildren(event.target.id);

    // Draw hover element in data
    drawComponent(event.target.id, "ghost");
    lastDrawnOn = event.target;

    // Wait for mouse click
    event.target.addEventListener("mouseClick", mouseClickCallback);

    // Draw hover element properly
    var mouseClickCallback = function() {
      console.log("TODO: Draw component properly");
    }

    // Wait for mouse to move out of that cell
    if (event.target.id !== lastDrawnOn.id) {
      // Remove current element in old cell
      removeAllChildren(lastDrawnOn);
      // Draw old element saved
      lastDrawnOn.appendChild(currentElementInData);
    }
  }
});

 */
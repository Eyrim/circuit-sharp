window.onload = (): void => {
    fallback.load({
        jQuery: [
            // Google's CDN
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
            // Local fallback
            "http://localhost:8001/lib/jquery/dist/jquery.js"
        ]
    });

    // When jQuery is loaded
    fallback.ready(['jQuery'], (jQuery): void => {
        console.log("Loaded jQuery");

        let typeID: string = "";
        let placedNum: number = 0;
        let value: number = 0;

        $(document).ready((): void => {
            console.log("setIP");
            getUserIP();
        })

        main();

        function main(): void {
            attachComponentAreaHandlers();
            attachSubmitButtonHandler();
        }

        function attachSubmitButtonHandler(): void {
            $("#submitButton").click(submitButtonClickedHandler);
        }

        function submitButtonClickedHandler() {
            getUserIP();
        }

        function attachComponentAreaHandlers(): void {
            console.log("Attaching Component Area Handlers");
            for (let i: number = 0; i <= 7; i++) {
                $("#component-" + i).click(imgClickedHandler);
            }
        }
    
        function imgClickedHandler(event: any): void {
            typeID = event.target.id.split('-')[1];

            attachSchematicAreaHandlers();
        }

        function attachSchematicAreaHandlers(): void {
            console.log("Attaching Schematic Area Handlers");
            // Attaches schematicArea listeners
            for (let i:number = 0; i <= 24; i++) {
                //document.getElementById(String(i)).addEventListener("mousedown", mouseDownHandler); //TODO: REFACTOR TO jQUERY
                $("#" + String(i)).mousedown(mouseDownHandler);
                //document.getElementById(String(i)).addEventListener("dbclick", dbClickHandler); //TODO: REFACTOR TO jQUERY
            }
        }

        function rightClickHandler(event: any): void {
            event.stopPropagation();
            if (event.target.tagName.toLowerCase() == "img") { return; }

            removePlacedFromID(event.target.id);
            notifyControllerOfRemoval(event.target.id);
        }

        function notifyControllerOfRemoval(cellRemovedFromID: string): void {
            let url: string = `http://localhost:8001/API/RemoveComponent`;

            $.ajax({
                type: "POST",
                url: url,
                data: {
                    "removedFrom": cellRemovedFromID
                },
                success: (): void => {
                    console.log("Successful POST to remove component");
                },
                dataType: "json"
            });
        }

        function mouseDownHandler(event: any): void {
            console.log(event);
            if (event.target.tagName.toLowerCase() == "img") { return; }
            if (event.which == 3) {
                rightClickHandler(event);

                return;
            }

            console.log("Clicked on: " + event.target.id);
            console.log("TypeID: " + typeID);

            let numInContainer: number = event.target.childElementCount;

            if (numInContainer >= 1) { removePlacedFromID(event.target.id); }

            placeComponent(event.target.id);
        }

        function removePlacedFromID(parentID: string): void {
            console.log("Removing Placed");
            let parent: HTMLElement = document.getElementById(parentID);
            let children: HTMLCollection = parent.children;

            for (let i: number = 0; i < parent.childElementCount; i++) {
                if (children[i].id.split('-')[0] == "PlacedComponent") {
                    parent.removeChild(children[i]);
                }
            }
        }

        function placeComponent(parentID: string): void {
            let parent: HTMLElement = document.getElementById(parentID);
            let element: HTMLImageElement = document.createElement('img');
            let url: string = getURLFromTypeID();

            element.src = url;
            element.id = "PlacedComponent-" + placedNum;
            element.style.zIndex = "999";

            parent.appendChild(element);

            notifyControllerOfPlace(element);
            placedNum += 1;
            console.log("Appended to: " + parentID);
        }

        function getUserIP(): void {
            $.get("https://api.ipify.org?format=json", (data: any): void => {
                let url: string = `http://localhost:8001/API/SetUserID`;

                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        "userID": data.ip
                    },
                    success: (): void => {
                        console.log("Successful POST to set userID");
                    },
                    dataType: "json"
                });
            });
        }

        function successFunction(data: any): void {
            console.log("SUCCESS :D");
            console.log(data);
            setUserID(data.ip);
        }

        function setUserID(IP: string): void {
            let url: string = `http://localhost:8001/API/SetUserID`;
            /*let IP: string = getUserIP();*/

            //console.log(IP);

            $.ajax({
                type: "POST",
                url: url,
                data: {
                    "userID": IP
                },
                success: (): void => {
                    console.log("Successful POST to set userID");
                },
                dataType: "json"
            });
        }

        function notifyControllerOfPlace(element: HTMLImageElement): void {
            let url: string = `http://localhost:8001/API/PlaceComponent?`;
            url += `typeID=${typeID}&`;
            url += `parentElementID=${element.parentElement.id}`;

            console.log(`URL: ${url}`);

            $.ajax({
                type: "POST",
                url: url,
                data: "",
                success: (): void => {
                    console.log("Successful POST");
                },
                dataType: "text"
            });
        }
        
        function getURLFromTypeID(): string {
            let url: string = "http://localhost:8001/Images/ComponentImage?TypeID=";

            return url + typeID; 
        }
    });
}
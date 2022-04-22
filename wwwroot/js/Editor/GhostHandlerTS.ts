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
                document.getElementById(String(i)).addEventListener("mousedown", mouseDownHandler); //TODO: REFACTOR TO jQUERY
            }
        }

        function mouseDownHandler(event: any): void {
            console.log(event);
            if (event.target.tagName.toLowerCase() == "img") { return; }

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

        function getValueFromForm(form: HTMLFormElement, key: string): string {
            let formData = new FormData(form);

            return formData.get(key).toString();
        }

        function getUserIP(): void {
            /*$.getJSON("https://api.ipify.org?format=json")
                .then((data): void => {
                    return data.ip;
                })
                .catch((err): void => {
                    console.log()
                })*/
            $.get("https://api.ipify.org?format=json", successFunction);
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
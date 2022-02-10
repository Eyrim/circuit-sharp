class ComponentGhost {
    #componentIDMapURL = 'https://localhost:44338/Editor/ComponentToIDMapJSON';

    constructor(mousePosX, mousePosY, componentID) {
        this.configuredGhost = this.configureComponentGhost(mousePosX, mousePosY);
        this.componentID = "0";
        this.className = this.getClassNameFromComponentID();
    }

    fetchComponentIDData() {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', this.#componentIDMapURL, true);

        var responseJson = undefined;

        xhr.onload = () => {
            if (this.status === 200) {
                let json = JSON.parse(this.responseText);
                console.log("json thing: " + JSON.parse(this.responseText));

                responseJson = json;

                document.cookie = `responseJson=imacookie; expires=Fri, 31, Dec 2024 23:59:59 GMT; path=/`;
            }
        }

        xhr.send();

        //console.log("final return: " + document.cookie);
        return this.#getCookie('responseJson');
    }

    #getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    getClassNameFromComponentID() {
        let className = this.fetchComponentIDData();

        console.log("ClassName: " + className);
        return className;
    }

    configureComponentGhost(mousePosX, mousePosY) {
        // The translucent outline of the component, showing hovering
        let componentGhost = document.createElement("div");

        // Configures the ghost of the component
        componentGhost.className = this.componentID;
        componentGhost.style.top = mousePosY + "px";
        componentGhost.style.left = mousePosX + "px";
        componentGhost.id = this.componentID;
        componentGhost.style.filter = "opacity(50%)";


        return componentGhost;
    }

    moveGhost(posX, posY) {
        this.configuredGhost.style.top = posY + "px";
        this.configuredGhost.style.left = posX + "px";
    }
}
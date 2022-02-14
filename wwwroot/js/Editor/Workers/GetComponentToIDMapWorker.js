let xhr = new XMLHttpRequest();

xhr.open('GET', this.#componentIDMapURL, true);

var responseJson = undefined;

xhr.onload = () => {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        Worker.prototype.postMessage(json);
    }
}

xhr.send();
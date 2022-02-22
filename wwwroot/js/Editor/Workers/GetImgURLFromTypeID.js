/*let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://localhost:44338/Editor/GetImgUrlFromTypeID/', true);

xhr.onload = () => {
    postMessage(this.responseJson);
}

xhr.send();
*/

fetch('https://localhost:44338/Editor/GetImgUrlFromTypeID/', {method:"GET"})
    .then((response) => {
        postMessage(JSON.stringify(response.text));
    }, () => {
        Worker.prototype.postMessage("promise rejected");
    });
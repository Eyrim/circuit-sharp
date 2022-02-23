/*let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://localhost:44338/Editor/GetImgUrlFromTypeID/', true);

xhr.onload = () => {
    postMessage(this.responseJson);
}

xhr.send();
*/

fetch('https://localhost:44338/Editor/GetImgUrlFromTypeID/', {method:"GET"})
    .then((response) => {
        let responseText = JSON.parse(JSON.stringify(response.json()));
        postMessage(responseText)
        //postMessage(JSON.parse(JSON.stringify(this.responseJson)));
    }, () => {
        Worker.prototype.postMessage("promise rejected");
    });
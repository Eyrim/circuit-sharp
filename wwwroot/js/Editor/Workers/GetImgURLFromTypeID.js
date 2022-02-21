let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://localhost:44338/Editor/GetImgUrlFromTypeID/', true);

xhr.onload = () => {
    if (this.status === 200) {
        //let json = JSON.parse(this.responseJson);
        postMessage(this.responseJson);
    }
}

xhr.send();
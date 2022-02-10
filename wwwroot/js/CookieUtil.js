/*
 * Stolen from https://www.w3schools.com/js/js_cookies.asp#:~:text=Create%20a%20Cookie%20with%20JavaScript.%20JavaScript%20can%20create%2C,cookie%20is%20deleted%20when%20the%20browser%20is%20closed%3A
 * Commented by me
 */

// Sets a cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    // Sets the time on the date object to now + the number of days set (converted to milliseconds)
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();
    // Sets the actual cookie
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Gets a cookie
function getCookie(cname) {
    // The key value pair being searched for
    let name = cname + "=";
    // Decodes the cookies
    let decodedCookie = decodeURIComponent(document.cookie);
    // Splits the cookie into it's constituents
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        // The first 'section' of the cookie entry
        let c = ca[i];

        // 
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}
document.getElementById("redirect").style.visibility = "hidden";
function Shorten() {
    let url = document.getElementById("url").value;
    let request = new XMLHttpRequest();
    request.open("POST", `/short?domain=${url}`);
    request.send();

    setTimeout(function() {
        document.getElementById("showurl").textContent = `Url Shortend:`;
        document.getElementById("redirect").href =  "https://"  + window.location.hostname  + "/" + request.response;
        document.getElementById("redirect").style.visibility = "visible";

    }, 1500);
}


let form = document.getElementById("shorturl");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    Shorten();
})
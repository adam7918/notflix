if(!localStorage.getItem('accessToken')){
    alert("You must be logged in to view this page");
    window.location = "index.html";
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var username = getParameterByName('username');
var accessToken = localStorage.getItem('accessToken');
$.ajax
({
    type: "GET",
    headers: {
        'authorization': accessToken
    },
    url: "/users/" + username,
    success: function (response) {
        $(".container-fluid").append(' <h2 id="profile">' + response.username + '</h2>\n' +
            '    <h3 id="name">' + response.firstName + ' ' + response.lastName + '</h3>');
    },
    error: function () {
        alert("User does not exist" + username);
        window.location = "index.html";
    }
});
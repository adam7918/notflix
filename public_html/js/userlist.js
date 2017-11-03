if(!localStorage.getItem('accessToken')){
    alert("You must be logged in to view this page");
    window.location = "index.html";
}
var accessToken = localStorage.getItem('accessToken');
$.ajax({
    type: "GET",
    headers: {
        'authorization': accessToken
    },
    url: "/users/",
    success: function (data) {
        $.each(data, function (i, user) {
            $(".container-fluid").append('<div class="user-container">\n' +
                '        <div class="user-info">\n' +
                '            <h1>' + user.username + '</h1>\n' +
                '            <h2>' + user.firstName + ' ' + user.lastName + '</h2>\n' +
                '        </div>\n' +
                '        <a class="clickable" href="user.html?username=' + user.username + '"><div class="user-button">\n' +
                '            >\n' +
                '        </div></a>\n' +
                '    </div>');
        });
    }
});

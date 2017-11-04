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
if(getParameterByName('delete')){
    $.ajax
    ({
        type: "DELETE",
        headers: {
            'authorization': accessToken
        },
        url: "/users/ratings/" + getParameterByName('delete'),
        success: function (response) {
            alert("Movie rating removed");
            window.location = "user.html?username=" + username;
        },
        error: function (reponse) {
            alert(reponse.message);
            window.location = "user.html?username=" + username;
        }
    });
}
$.ajax
({
    type: "GET",
    headers: {
        'authorization': accessToken
    },
    url: "/users/" + username,
    success: function (response) {
        $(".container-fluid").prepend(' <h2 id="profile">' + response.username + '</h2>\n' +
            '    <h3 id="name">' + response.firstName + ' ' + response.lastName + '</h3>');
        var moviePoster,title;
        $.each(response.movieRating, function(i, item) {

            $.ajax
            ({
                type: "GET",
                url: "/movies/" + item.imdbtt,
                success: function (response) {
                    moviePoster = response.poster;
                    title = response.title;
                    $(".container-fluid").append('    <div class="movie-container">\n' +
                        '        <div class="movie-rating">' + item.rating + '</div>\n' +
                        '        <div class="movie" style="background: url(' + moviePoster + '">\n' +
                        '\n' +
                        '        </div>\n' +
                        '        <h2>' + title + '</h2>\n' +
                        '        <a href="user.html?imdbtt=' + item.imdbtt + '"<button class="btn btn-outline-danger edit-button">Edit</button></a>\n' +
                        '        <a href="user.html?username=' + username + '&delete=' + item.imdbtt + '"><button class="btn btn-outline-danger edit-button" id="rating-delete">Delete</button></a>\n' +
                        '    </div>');

                },
                error: function () {
                    alert("Movie does not exist");
                    window.location = "index.html";
                }
            });

        });
    },
    error: function () {
        alert("User does not exist" + username);
        window.location = "index.html";
    }
});

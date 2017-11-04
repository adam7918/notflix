function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var imdbtt = getParameterByName('imdbtt');
var movieRating;
$.ajax({
    type: "GET",
    url: "/movies/ratings/" + imdbtt,
    success: function (data) {
        try {
            movieRating = data[0].rating;
        } catch (e) {
            if (e) {
                movieRating = "N/A";
            }
        }
    }});

$.ajax
({
    type: "GET",
    url: "/movies/" + imdbtt,
    success: function (response) {
        $(".container-fluid").append('    <div class="row">\n' +
            '        <div class="movie-poster-container">\n' +
            '            <figure><img src="' + response.poster + '" class="movie-poster"></figure>\n' +
            '            <div class="movie-rating-bar">' + movieRating + '</div>\n' +
            '        </div>\n' +
            '        <div class="movie-information-container col">\n' +
            '            <h2>' + response.title + '</h2><small class="movie-year" >' + response.publicationDate.substring(0, 4) + '</small><br>\n' +
            '            <h3>Director: ' + response.director + '</h3>\n' +
            '            <p class="movie-description">' + response.description + '</p>\n' +
            '            <small class="runtime">Runtime: ' + response.length + ' minutes</small><br>\n <div id="slidecontainer">\n' +
            '  <input type="range" min="1" max="10" value="1" class="slider logged-in" id="myRange">\n' +
            '</div><p id="sliderRating" class="logged-in" style="margin-top: 25px"></p>' +
            '            <button class="btn btn-outline-danger rating-button logged-in" id="rate-button">Rate</button>\n' +
            '        </div>\n' +
            '    </div>');
    },
    error: function () {
        alert("Movie does not exist");
        window.location = "index.html";
    }
});
$(document).ready(function() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("sliderRating");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
});
var accessToken = localStorage.getItem('accessToken');
$(function () {
    $('#rate-button').click(function () {
        var output = document.getElementById("sliderRating");
        var ratingJson = {rating: parseInt(output.innerHTML)};
        $.ajax
        ({
            type: "PUT",
            url: "/users/ratings/" + imdbtt,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            headers: {
                'authorization': accessToken
            },
            data: JSON.stringify(ratingJson),
            success: function (response) {
                alert("Movie rated!")
            },
            error: function () {
                alert("Could not rate movie");
            }
        }).done(function(){

        });
    });
});


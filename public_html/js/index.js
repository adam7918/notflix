$.ajax({
    type: "GET",
    url: "/movies/",
    success: function (data) {
        $.each(data, function (i, movie) {
            $.ajax({
                type: "GET",
                url: "/movies/ratings/" + movie.imdbtt,
                success: function (data) {
                    var movieRating;
                    try {
                        movieRating = data[0].rating;
                    } catch (e) {
                        if (e) {
                            movieRating = "N/A";
                        }
                    }
                    $(".container-fluid").append('<a style="display:block" href="#"><div class="movie-container">\n' +
                        '            <div class="movie-rating">' + movieRating + '</div>\n' +
                        '            <div class="movie" style="background:url(' + movie.poster + ')">\n' +
                        '            </div>\n' +
                        '            <h2>' + movie.title + '</h2>\n' +
                        '        </div></a>');
                },
                error: [
                    function () {
                        alert(movie.title);
                    }
                ]
            });
        });
    }
});



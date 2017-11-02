$.ajax({
    type: "GET",
    url: "/movies/",
    success: function(data){
        $.each(data, function(i, movie){
            $(".container-fluid").append('<div class="movie-container">\n' +
                '            <div class="movie-rating">8.1</div>\n' +
                '            <div class="movie">\n' +
                '            </div>\n' +
                '            <h2>' + movie.title + '</h2>\n' +
                '        </div>')
        });
    }
});
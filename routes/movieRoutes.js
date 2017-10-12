var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

// GET ALL MOVIES
router.get('/', function(req, res) {
    Movie.find(function(err, movies) {
        if (err) res.status(500).json("Server error");
        res.status(200).json(movies);
    });
});

// USED FOR TESTING
router.post('/', function(req, res) {
    var movie = new Movie();
    movie.imdbtt = req.body.imdbtt;
    movie.title = req.body.title;
    movie.publicationDate = req.body.publicationDate;
    movie.length = req.body.length;
    movie.director = req.body.director;
    movie.description = req.body.description;

    movie.save(function(err) {
        if (err) res.status(401).json("Error creating movie");

        res.status(201).json({ message: 'Movie created!' });
    });

});


module.exports = router;
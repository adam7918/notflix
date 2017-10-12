var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

// GET - Returns all movies in a JSON array
router.get('/', function(req, res) {
    Movie.find(function(err, movies) {
        if (err) res.status(500).json("Server error");
        res.status(200).json(movies);
    });
});

// GET - Returns movie based on ID param given by user
router.get('/:imdbtt', function(req, res) {
    Movie.findOne({"imdbtt" : req.params.imdbtt},function(err, movie) {
        if (err) res.status(500).json("Server error");
        if(movie === null){
            res.status(404).json("Movie not found");
        } else {
            res.status(200).json(movie);
        }
    });
});

// =========USED FOR TESTING===========DELETE AFTER
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

// Export
module.exports = router;
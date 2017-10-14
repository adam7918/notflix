var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');

// GET - Returns all movies in a JSON array
router.get('/', function(req, res) {
    Movie.find(function(err, movies) {
        if (err) res.status(500).json({ message: "Server Error 500"});
        res.status(200).json(movies);
    });
});

// GET - Returns movie based on ID param given by user
router.get('/:imdbtt', function(req, res) {
    Movie.findOne({"imdbtt" : req.params.imdbtt},function(err, movie) {
        if (err) res.status(500).json({ message: "Server error 500" });
        if(movie === null){
            res.status(404).json({ message: "Movie not found" });
        } else {
            res.status(200).json(movie);
        }
    });
});

// GET a list of all movies and their average ratings
router.get('/ratings/:imdbtt', function(req, res) {
    User.aggregate([
        {$unwind : "$movieRating"},
        {$match: {"movieRating.imdbtt" : req.params.imdbtt}},
        {$group : {
            "_id": null,
            "rating" :{$avg :  "$movieRating.rating"}
        }
        }
    ],  function(err, rating){
        if (err) throw err;
        res.status(200).json(rating);
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
        if (err) res.status(401).json({ message: "Error creating movie"});

        res.status(201).json({ message: 'Movie created!' });
    });
});

// Export
module.exports = router;
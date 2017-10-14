var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
var Movie = require('../models/movie');
var middlewares = require('./middlewares');


// GET - Return all users
router.get('/', middlewares.authenticate,function(req, res) {
    User.find(function(err, users) {
        if (err) res.status(500).json({ message: "Server Error 500"});

        res.status(200).json(users);
    });
});

// GET - Return user based on username parameter
router.get('/:username', middlewares.authenticate, function(req, res) {
    User.findOne({"username":req.params.username},function(err, user) {
        if (err) res.status(500).json({ message: "Server Error 500"});
        if(user === null){
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    });
});

// POST - add a new user
router.post('/', function(req, res) {
    var user = new User();		// create a new instance of the User model
    user.firstName = req.body.firstName;  // set the user name (comes from the request)
    user.lastName = req.body.lastName;
    user.middleName = req.body.middleName;
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
        if (err) {
            res.status(400).json({ message: "Bad request, missing data"});
        } else {
            res.status(201).json({ message: 'User created!' });
        }
    });
});

router.post('/authenticate', function(req, res) {
    // find the user
    User.findOne({"username":req.body.username},function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, req.app.get('private-key'), {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Succesfully authenticated, use the following token in the header!',
                    token: token
                });
            }
        }
    });
});


router.put('/:imdbtt', middlewares.authenticate, function(req, res) {
    // CHECK IF MOVIE EXISTS
    Movie.findOne({"imdbtt": req.params.imdbtt}, function (err, movie) {
        if (err) throw err;
        if (!movie) {
            res.status(404).json({message: 'Movie not found'});
        } else if (!req.body.rating) {
            res.status(400).json({message: 'Missing rating'});
        } else {
            User.update(
                {
                    "username": "Joey"
                },
                {
                    "$push": {
                        "movieRating": {
                            "imdbtt": req.params.imdbtt,
                            "rating": req.body.rating
                        }
                    }
                }, function (err, movie) {
                    if (err) throw err;
                    res.status(200).json({message: 'Movie Rated!'});
                });
        }
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET - Return all users
router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) res.status(500).json({ message: "Server Error 500"});

        res.status(200).json(users);
    });
});

// GET - Return user based on username parameter
router.get('/:username', function(req, res) {
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

module.exports = router;
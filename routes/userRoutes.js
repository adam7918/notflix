var express = require('express');

var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) res.status(500).json("Error code 500, something went horribly wrong");

        res.status(200).json(users);
    });
});

router.post('/', function(req, res) {
    var user = new User();		// create a new instance of the User model
    user.name = req.body.name;  // set the user name (comes from the request)
    user.id = req.body.id;

    user.save(function(err) {
        if (err) res.status(400).json("Bad request, missing data");

        res.status(201).json({ message: 'User created!' });
    });

});

module.exports = router;
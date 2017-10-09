var express = require('express');

var router = express.Router();

var User = require('../models/user');

router.get('/userlist', function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        console.log(users);
        res.json(users);
    });
});

router.post('/', function(req, res) {
    var user = new User();		// create a new instance of the User model
    user.name = req.body.name;  // set the user name (comes from the request)
    user.id = req.body.id;

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'User created!' });
    });

});

module.exports = router;
// Call packages needed
var express    = require('express');
    users    = require('./routes/userRoutes'),
    movies    = require('./routes/movieRoutes'),
    ratings   = require('./routes/ratingRoutes');
var bodyParser = require('body-parser');
var app = module.exports = express(); //now app.js can be required to bring app into any file
var jwt = require('jsonwebtoken');

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Set token key to "adamjoey"
app.set('private-key', 'adamjoey');


// Set port
var port = process.env.PORT || 3000;

// Database setup
var mongoose   = require('mongoose');
var mongoDB = 'mongodb://localhost/database';
mongoose.connect(mongoDB, {
    useMongoClient: true
}, function(err) {
    console.log(err);
});


// Routes for API
app.use('/users',  users);
app.use('/movies',  movies);
app.use('/ratings', ratings);

// Start the server
app.listen(port);
console.log('Server running on port: ' + port);
// Call packages needed
var express    = require('express');
    users    = require('./routes/userRoutes'),
    movies    = require('./routes/movieRoutes'),
    ratings   = require('./routes/ratingRoutes');
var bodyParser = require('body-parser');
var app        = express();

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 3000;

// Database setup
var mongoose   = require('mongoose');
var mongoDB = 'mongodb://localhost/database';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

// Get the default connection
var db = mongoose.connection;

// Handle connection events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connection successful");
});

// Routes for API
app.use('/users',  users);
app.use('/movies',  movies);
app.use('/ratings', ratings);

// Start the server
app.listen(port);
console.log('Server running on port: ' + port);
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RatingSchema   = new Schema({
    username : { type : String, required: true },
    imdbtt : { type : Number, required: true },
    rating: { type : Number, required: true },
});

module.exports = mongoose.model('Rating', RatingSchema);
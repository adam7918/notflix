var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RatingSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Rating', RatingSchema);
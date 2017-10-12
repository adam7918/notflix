var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username: { type : String, required: true },
    password: { type : String, required: true },
    firstName: { type : String, required: true },
    middleName: { type : String, required: true },
    lastName: { type : String, required: true },
    movieRating: { type : [{
        imdbtt:{type: Number},
        rating:{type: Number}
    }]}
});

module.exports = mongoose.model('User', UserSchema);
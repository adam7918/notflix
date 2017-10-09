var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MovieSchema   = new Schema({
    imdbtt: { type : Number, required: true },
    title: { type : String, required: true },
    publicationDate: { type : Date, required: true },
    length: { type : Number, required: true },
    director: { type : String, required: true },
    description: { type : String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);
const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var catalogue = new Schema({
    
    libele: String,
    description: String,
    prix: Number,
    image: String

});

module.exports = mongoose.model('catalogue',catalogue);
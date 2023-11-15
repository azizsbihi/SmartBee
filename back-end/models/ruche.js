const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var ruche = new Schema({
    
    libele: String,
    humidite: String,
    temperature: String,
    poids: String,
    image: String,
    motion: Number,
    userid:Number

});
module.exports = mongoose.model('ruche',ruche);
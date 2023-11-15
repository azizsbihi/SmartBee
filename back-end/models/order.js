const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var order = new Schema({
    
    libele: String,
    adresse: String,
    totalprice: Number,
    date: Date,
    status: {
        type: String,
        enum: ['pending','received'],
        default: 'pending'
      },
      userid:Number,

});

module.exports = mongoose.model('order',order);











const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var reclamation = new Schema({
    
    sujet: String,
    description: String,  
    date: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['pending', 'resolved', 'rejected'],
        default: 'pending'
      },
    userid:Number,
  

});
module.exports = mongoose.model('reclamation',reclamation);
var express = require('express');
var router = express.Router();
var user = require('../models/User');








router.get('/getuser', function(req, res, next) {
    user.findOne({email:req.body.email}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});


/*router.get('/getuser', function(req, res, next) {
  user.findOne({email:req.body.email},
    (err, ress) => {
        
        res.json(user);
    }
  );
});*/

router.get('/display', function(req, res, next) {
  user.find(
    (err, Ruche) => {
        
        res.json(user);
    }
  );
});






 
  module.exports = router;
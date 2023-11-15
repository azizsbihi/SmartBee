var express = require('express');
var router = express.Router();
var Ruche = require('../models/ruche');


router.post('/add', function(req, res, next) {
  var ruche = new Ruche({libele: req.body.libele, humidite: req.body.humidite,temperature: req.body.temperature,poids: req.body.poids,image: req.body.image,motion: req.body.motion,userid: req.body.userid});
  ruche.save((err, newContact) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(ruche);



          console.log('ruche ajoute!!');
          //res.send('respond with a resource');
      }
  });
});




router.get('/display', function(req, res, next) {
    Ruche.find(
      (err, Ruche) => {
          
          res.json(Ruche);
      }
    );
  });

  router.get('/displayruches/:userId', function(req, res, next) {
    const userId = req.params.userId;
    Ruche.find({ userid: userId }, function(err, ruches) {
      if (err) {
        return next(err);
      }
      res.json(ruches);
    });
  });





  

  router.get('/search', function(req, res, next) {
    Ruche.findOne({libele:req.body.libele}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});



router.put('/edit/:id', function(req, res, next) {
    Ruche.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.libele = req.body.libele;
      cont.humidite = req.body.humidite;
      cont.temperature = req.body.temperature;
      cont.poids = req.body.poids;
      cont.image = req.body.image;
      cont.motion = req.body.motion;
      cont.userid= req.body.userid;
      cont.save((err, updatedCont) => {
        console.log("updated ruche !");
        res.send('updated');
        // res.redirect('/employe');
      });
  });
});


router.delete('/delete/:id', function(req, res, next) {
  Ruche.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          //res.send('delete');
          console.log('Ruche supprimé!!');
      }

  });
});
  module.exports = router;
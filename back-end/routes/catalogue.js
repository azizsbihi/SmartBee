var express = require('express');
var router = express.Router();
var Catalogue = require('../models/catalogue');
const nodemailer = require('nodemailer');

router.post('/add', function(req, res, next) {
  var catalogue = new Catalogue({libele: req.body.libele, description: req.body.description,prix: req.body.prix,image: req.body.image});
  catalogue.save((err, newContact) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(catalogue);



          console.log('catalogue ajoute!!');
          //res.send('respond with a resource');
      }
      

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'med.benabdeladhim@gmail.com',
        pass: 'njxutksfeawzafhl'
    }
});

// setup email data with unicode symbols
let mailOptions = {
   
    from: ' med.benabdeladhim@gmail.com', // sender address
    to: 'mohamedamine.bejaoui@esprit.tn', // list of receivers
    subject: 'Catalogue Ajouter ', // Subject line
    text: 'vous avez ajouter un nouveau catalogue', // plain text body
    html: 'aaaa' // html body
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});

  });
});




router.get('/display', function(req, res, next) {
    Catalogue.find(
      (err, Catalogue) => {
          
          res.json(Catalogue);
      }
    );
  });

  

  router.get('/search', function(req, res, next) {
    Catalogue.findOne({libele:req.body.libele}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});


router.put('/edit/:id', function(req, res, next) {
    Catalogue.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.libele = req.body.libele;
      cont.description = req.body.description;
      cont.prix = req.body.prix;
      cont.image = req.body.image;
  
      cont.save((err, updatedCont) => {
        res.json(cont);
        
        // res.redirect('/employe');
      });
  });
});


router.delete('/delete/:id', function(req, res, next) {
  Catalogue.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          //res.send('delete');
          console.log('Catalogue supprimé!!');
      }

  });
});




  module.exports = router;
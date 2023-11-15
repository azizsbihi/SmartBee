var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
const Reclamation = require('../models/reclamation');



async function getAllReclamations() {
  try {
    const reclamations = await Reclamation.find();
    return reclamations;
  } catch (error) {
    throw new Error(`Could not get all reclamations: ${error.message}`);
  }
}
router.get('/all', async (req, res) => {
  try {
    const reclamations = await getAllReclamations();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', function(req, res, next) {
  var reclamation = new Reclamation({sujet: req.body.sujet,description: req.body.description, userid: req.body.userid,status:req.body.status,date:req.body.date});
  reclamation.save((err, newContact) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(reclamation);



          console.log('reclamation ajoute!!');
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
  reclamation.find(
    (err, Reclamation) => {
        
        res.json(Reclamation);
    }
  );
});


router.get('/displayreclamations/:userId', function(req, res, next) {
  const userId = req.params.userId;
  Reclamation.find({ userid: userId }, function(err, reclamations) {
    if (err) {
      return next(err);
    }
    res.json(reclamations);
  });
});





  


router.put('/edit/:id', function(req, res, next) {
    Reclamation.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.sujet = req.body.sujet;
      cont.description = req.body.description;
      cont.userid = req.body.userid;
      
  
      cont.save((err, updatedCont) => {
        res.json(cont);
        
        // res.redirect('/employe');
      });
  });
});


router.delete('/delete/:id', function(req, res, next) {
  Reclamation.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          //res.send('delete');
          console.log('Reclamation supprimé!!');
      }

  });
});




  module.exports = router;
const express = require('express');
const app = express();
const router = express.Router();

router.post('/post', (req, res) => {
  const data = req.body;
  // Faire quelque chose avec les données reçues
  console.log(data);
  // Renvoyer une réponse
  res.send('Données reçues avec succès!');
});

app.use(express.json());
app.use(router);

module.exports = app;

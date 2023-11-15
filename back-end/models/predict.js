const { spawn } = require('child_process');

// Définir une fonction pour appeler la fonction de prédiction de Python
function fairePrediction(donnees, callback) {
    // Appeler la fonction de prédiction de Python en tant que processus enfant
    const pythonProcess = spawn('python', ['predict.py']);

    // Écouter la sortie du processus enfant
    pythonProcess.stdout.on('data', (data) => {
        // Analyser les données de sortie JSON
        const prediction = JSON.parse(data);

        // Appeler le rappel avec la prédiction
        callback(prediction);
    });

    // Écrire les données d'entrée dans le flux d'entrée du processus enfant
    pythonProcess.stdin.write(JSON.stringify(donnees));

    // Fermer le flux d'entrée du processus enfant
    pythonProcess.stdin.end();
}

// Exporter la fonction de prédiction
module.exports = fairePrediction;
const functions = require('firebase-functions')

// Specify the region explicitly (e.g., australia-southeast2 for Melbourne)
exports.helloWorld = functions
  .region('australia-southeast2')
  .https.onRequest((req, res) => {
    res.send('Hello from Melbourne!')
  })

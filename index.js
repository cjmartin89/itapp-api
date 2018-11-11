const admin = require('firebase-admin');
var serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();

//Time Setting Adjustment for Firestore
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var db = admin.firestore();
  
const express = require('express');
var bodyParser = require('body-parser')

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.get('/quotes', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  var data = []
  db.collection('quotes').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      data.push(doc.data())
    }), res.send(JSON.stringify(data));
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
});

app.post('/quotes', (req, res) => {
  var data = {
    quote: req.body.quote,
    person: req.body.person
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  db.collection('quotes').doc('3').set(data);
  res.status(200)
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql/index.js');

const PORT = 3002;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/transactions', (req, res) =>{
  db.getTransactions(req.query, (err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});

app.get('/mapping', (req, res)=> {
  let {description} = req.query;
  let identifier = description.split('/')[2];
  db.getIdentifiers(identifier, (err,customer) => {
    if(err) {
      res.sendStatus(500);
    } else {
      db.getCustomers(customer, (err, data) => {
        if(err) {
          res.sendStatus(500)
        } else {
          res.json(data)
        }
      })
    }
  })
})

app.listen(PORT, function() {
  console.log('listening on port 3002!');
});



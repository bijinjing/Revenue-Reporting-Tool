var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql/index.js');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../react-client/dist'));
app.get('/items', function (req, res) {
  console.log(req.body)
  // db. getTransactions(req.body, (err, data) => {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     console.log(data)
  //     res.json(data);
  //   }
  // });
  res.send('ue')
});

app.listen(3002, function() {
  console.log('listening on port 3002!');
});


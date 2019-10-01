var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql/index.js');

const PORT = 3002;
var app = express();
// app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
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

app.get('/mapping', (req, res, next)=> {
  let { transactions } = req.query;
  transactions = JSON.parse(transactions)
  let lastIndex = transactions[transactions.length -1].id;
  let mappingList = []
  transactions.forEach((transaction,key) => {
    let identifier = transaction.description.split('/')[2];
    let id = transaction.id
    db.getIdentifiers(identifier, (err,customer) => {
      if(err) {
        res.sendStatus(500);
      } else {
        db.getCustomers(customer, (err, data) => {
          if(err) {
            res.sendStatus(500)
          } else {
            mappingList.push({
              id:transaction.id,
              customer: data[0].name,
              feeRate:data[0].fee_rate
            })
            if(id === lastIndex){              
              res.json(mappingList)
            } 
          }
        })
      }
    })
  })
  
})

app.listen(PORT, function() {
  console.log('listening on port 3002!');
});



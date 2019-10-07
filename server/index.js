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
  let mappingList = {};
  let trxKeyArr = Object.keys(transactions);
  let length = trxKeyArr.length;
  trxKeyArr.forEach((i,key) => {
    let transaction = transactions[i]
    let identifier = transaction.description.split('/')[2];
    db.getIdentifiers(identifier, (err,customer) => {
      if(err) {
        res.sendStatus(500);
      } else {
        db.getCustomers(customer, (err, data) => {
          if(err) {
            res.sendStatus(500)
          } else {
            console.log(data)
            mappingList[i] = {
              customer: data[0].name,
              customerId:data[0].id,
              feeRate:data[0].fee_rate
            }
            if(key === length-1){
              res.json(mappingList)
            }
          }
        })
      }
    })
  })

  // let getMapping = () => {
  //   return new Promise((resolve,reject) => {
  //     db.getIdentifiers(identifier, (err, customer) => {
  //       if(err) {
  //         reject(err)
  //       } else {
  //         db.getCustomers(customer, (err, data) => {
  //           if (err) {
  //             reject(err)
  //           } else {
  //             resolve(data)
  //           }
  //         })
  //       }
  //     })
  //   })
  // }

  // for(let key in transactions) {
    // let transaction = transactions[key];
    // let identifier = transaction.description.split('/')[2];
  //   await getMapping()
  //          .then((data) => {
  //            mappingList[key] = {
  //              customer:data[0].name,
  //              feeRate:data[0].fee_rate
  //            }
  //          })
  //          .catch((err) => {
  //            res.sendStatus(500)
  //          })


})

app.post('/subLedger', (req, res, next)=> {
  let { postDate, entryDate, transactions, mappedTransactions} = req.body.params;
  let payable = revenue - cash;

  let param = [[100,cash,date],[200,payable,date],[600, -revenue, date]]
    db.postGL(param, (err,results) => {
      if(err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
})

app.post('/entry', (req, res, next)=> {
  let { cash, revenue, date} = req.body.params;
  let payable = revenue - cash;

  let param = [[100,cash,date],[200,payable,date],[600, -revenue, date]]
    db.postGL(param, (err,results) => {
      if(err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
})

app.listen(PORT, function() {
  console.log('listening on port 3002!');
});



const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql/index.js');
const uuidv1 = require('uuid/v1');

const PORT = 3002;
const app = express();
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
        next()
      } else {
        db.getCustomers(customer, (err, data) => {
          if(err) {
            res.sendStatus(500)
          } else {
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
  let entryId = uuidv1();
  let { transactions, mappedTransactions} = req.body.params;
  let fullDateArr = Object.values(transactions)[0].date.split(" ")[0].split("-")
  let entryDate = fullDateArr[0] + "-"+ fullDateArr[1];
  let postDate = new Date();
  let trxArr = Object.keys(transactions);
  let lastIndex = trxArr.length - 1;

  trxArr.forEach((id,key) => {
    let {amount} = transactions[id];
    let {revenue, payable, customerId} = mappedTransactions[id];
    let param = [[entryId,id,customerId,postDate,entryDate,100,amount],[entryId,id,customerId,postDate,entryDate,200,payable],[entryId,id,customerId,postDate,entryDate,600, -revenue]]

    db.postGL(param, (err,results) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
        next();
      } else {
        if(lastIndex === key){
          res.sendStatus(200);
        }
      }
    })
  })
})


app.listen(PORT, function() {
  console.log('listening on port 3002!');
});



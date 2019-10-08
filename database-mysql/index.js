const mysql = require('mysql');
const download = require('./downloadTransaction.js');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'Customer_transaction_summary'
});

const getTransactions = (param, callback) => {
  let {y,m} = param;
  let selectMessage = `select * from transactions where date like '%${y}-${m}%'`;
  connection.query(selectMessage, (err,data) => {
    if(err){
      callback(err)
    } else if(data.length > 0){
      callback(null,data)
    } else {
      download.downloadData(connection,param,(err,result)=> {
        if(err){
          callback(err)
        } else {
          connection.query(selectMessage, (err,data) => {
            if(err){
              callback(err)
            } else {
              callback(null, data)
            }
          })
        }
      })
    }
  })
};

const getIdentifiers = (param, callback) =>{
  let selectMessage = `select * from identifiers where identifier = ${param}`;
  connection.query(selectMessage, (err, data) => {
    if(err){
      callback(err)
    } else {
      callback(null, data)
    }
  });
};

const getCustomers = function(param, callback) {
  let id = param[0].customer;
  let selectMessage
  if(id === "all") {
    selectMessage = `select * from customers`;
  } else {
    selectMessage = `select * from customers where id = ${id}`;
  }
  console.log(selectMessage)

  connection.query(selectMessage, (err, data) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const postGL = function(param, callback) {
  let insertMessage = 'INSERT INTO General_ledger (entryId, transaction,customer,postDate, entryDate, GL, amount) VALUES ?'
  connection.query(insertMessage, [param], (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getGL = function(param, callback) {
  let {filter, criteria} = param;
  let selectMessage = `SELECT * FROM General_ledger where ${filter} = ${criteria}`
  connection.query(selectMessage, (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//update
const deleteGL = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//update
const updateGL = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//update
const addCustomer = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

//update
const addFilterToExistingCustomer = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getTransactions,
  getIdentifiers,
  getCustomers,
  postGL
}
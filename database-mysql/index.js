const mysql = require('mysql');
const download = require('./downloadTransaction.js');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'Customer_transaction_summary'
});

const getTransactions = function(param, callback) {

  let {y,m} = param;
  let selectMessage = `select * from transactions where date like '%${y}-${m}%'`;
  download(connection,param,(err,result)=> {
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
};

const getGLs = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const postGL = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
const deleteGL = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updateGL = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const addCustomer = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

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
  getTransactions
}

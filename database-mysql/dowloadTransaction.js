var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Root',
  password : 'Student111!',
  database : 'Customer_transaction_summary'
});

cosnt customer = ['Stay', 'Airbnb', 'Uber', 'Line',"Wework"];
const feeRate = [0.01, 0.015, 0.02, 0.025, 0.3];




INSERT INTO tasks(title,priority)
VALUES('Learn MySQL INSERT Statement',1);
var insertGL = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

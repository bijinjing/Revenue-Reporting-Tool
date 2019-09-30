
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   database : 'Customer_transaction_summary'
// });

const message = 'INSERT INTO transactions (description, amount, date) VALUES ?';
const filters = ['0023', '0032', '0027', '0067','0018', '0456', '0436', '0467', '0765', '0789', '1234', '1245', '1343', '1876', '1845', '4456', '4563', '9875', '2346', '4907', '6754', '6098', '6542', '6523', '6908', '5673', '5321', '5789', '5435', '5678', '6765', '6545', '6780', '6876', '6789', '7653', '7809', '7690', '7654', '7898', '14367', '19087', '14567', '13256', '11909', '654906', '678643', '679870', '643245', '678621'];
const newFilters = new Array(6).fill(0).map((num => {
  return Math.floor(Math.random()*10)
})).join('')
const randomWords = ['/JPMorgn/','/hjkjkcash/','/USbank87mchange/','/wellsFargo/','/dbhu!/','/cashin/']


const downloadData = function(connection,param, callback){
  const y = Number(param.y);
  const m = Number(param.m);
  const randomDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  const values = [];
  for(var i=0; i<50; i++){
    let filterIndex = Math.floor(Math.random()*50);
    let otherIndex1 = Math.floor(Math.random()*6)
    let otherIndex2 = Math.floor(Math.random()*6)
    let existingMessage = randomWords[otherIndex1] + filters[filterIndex] + randomWords[otherIndex2];
    // let newMessage = randomWords[otherIndex1] + newFilters + randomWords[otherIndex2];
    // let newi = Math.floor(Math.random()* 5);
    let amount = Math.floor(Math.random()*10000000) /100;
    let description = existingMessage;
    // let description = (i === newi? newMessage : existingMessage);
    let date = randomDate(new Date(y,m-1), new Date(y,m));
    values.push([description, amount, date])
  }
  connection.query(message, [values], (err, results) => {
    if(err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
}

// download({y:2019,m:8},(err,data) => {
//   if(err){
//     console.log(err)
//   } else {
//     console.log (data)
//   }
// })

module.exports = {
  downloadData
};

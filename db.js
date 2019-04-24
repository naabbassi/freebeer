var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  database: 'freebeer'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Use connect method to connect to the Server
function insert(data,callback) {
  connection.query('Insert into days set ? ', data, function (err, r, f) {
    if (!err) {
      callback(r);
    } else {  
    console.log(err);
    }
  })
}

function getDaySum(day, callback) {
  connection.query('SELECT count(*) AS daysum FROM days WHERE day =?', day, function (err, results, fields) {
    callback(results)
  })
}
module.exports = {
  insert,
  getDaySum
}
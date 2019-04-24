const { connection } = require('pg')

const connection = new Pool({
  user: 'bsjdzyojyqprcu',
  host: 'ec2-50-17-227-28.compute-1.amazonaws.com',
  database: 'd747lj4kthdgli',
  password: 'dc275f969191c9aa285e33363dfe0d6e6d30bbefa4d91eb0f5cce55af9df243d',
  port: 5432,
})

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
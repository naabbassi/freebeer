const { Client } = require('pg')

const client = new Client({
  user: 'bsjdzyojyqprcu',
  host: 'ec2-50-17-227-28.compute-1.amazonaws.com',
  database: 'd747lj4kthdgli',
  password: 'dc275f969191c9aa285e33363dfe0d6e6d30bbefa4d91eb0f5cce55af9df243d',
  port: 5432
})



// Use connect method to connect to the Server
async function insert(data,callback) {
  await client.connect();
  client.query('INSERT INTO "public"."days" ("id", "day", "value", "datetime") VALUES (DEFAULT, $1, $2 ,$3)', data.day,data.value,data.date,(err, r)=> {
    console.log(err,r);
    callback(r);
  })
  await client.end();
}

function getDaySum(day, callback) {
  client.query('SELECT count(*) AS daysum FROM days WHERE day =?', day,  (err, results)=> {
    console.log(err,r);
    callback(results)
  })
}
module.exports = {
  insert,
  getDaySum
}
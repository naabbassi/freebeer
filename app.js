var express = require('express');
var bp = require('body-parser');
var path = require('path');
var db = require('./db');
var Port = process.env.Port || 8888;

var app = express();
// Body-parser middleware
app.use(bp.json());
app.use(bp.urlencoded({
  extended: false
}));
app.use('/static', express.static(__dirname + '/public'));
/* logger
var logger = function (req,res, next) {
  console.log(req.path);
  next();
}
app.use(logger);
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.get('/', function (req, res) {
  
  res.render('index');
});

function getDay() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day
}
app.get('/chance/newtry', function (req, res) {
  var data = {
    day : getDay(),
    value : 1,
    date : new Date()
  }
  db.insert(data,function(r){
    res.send(r);
  })
})
app.get('/chance/getdaysum',function (req,res) {
  db.getDaySum(getDay(),function(r){
    res.send(r);
  });
});
app.listen(Port, function () {
  console.log('server is running on port 8888!');
})
var express = require ('express'); //requires the module to be used
var path = require("path"); //for traversing of paths
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express(); //assigns to app

var config = require(__dirname + '/config/config');
var port_number = process.env.PORT || config.port;

app.use(cookieParser());
app.use(session({
  secret:'127proj',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));
app.get('/', function(req,res){
  res.sendFile((path.join(__dirname+'/index.html')));
});
app.use(require(__dirname+'/config/router')(express.Router()));



app.listen(port_number);
console.log("Express Web Server up and runnning on http://localhost:"+config.port);

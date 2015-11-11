var express = require ('express'); //requires the module to be used
var path = require("path"); //for traversing of paths
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var app = express(); //assigns to app

var config = require(__dirname + '/config/config');
var port_number = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(serveStatic(__dirname + '/public'));
app.get('/', function(req,res){
  res.redirect('/index.html');
});

app.listen(port_number);
console.log("Express Web Server up and runnning on http://localhost:"+config.port);

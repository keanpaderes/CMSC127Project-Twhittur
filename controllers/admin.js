var pg = require('pg');
var path = require("path"); //for traversing of paths
var root = path.dirname(require.main.filename);
var conString = "postgres://kean:soraxy31@localhost/Twittur";

exports.redirectLanding = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    res.sendFile((path.join(root+'/public'+'/Admin.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

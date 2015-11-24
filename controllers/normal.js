var pg = require('pg');
var path = require("path"); //for traversing of paths
var root = path.dirname(require.main.filename);
var conString = "postgres://kean:soraxy31@localhost/Twittur";

exports.redirectLanding = function(req,res,next){ //callback function
  if(req.session.email){
    console.log(__dirname);
    res.sendFile((path.join(root+'/public'+'/Home.html')));
  } else{
    console.log('Not Logged In!');
    res.redirect('/');
  }
};

var pg = require('pg');
var path = require("path"); //for traversing of paths
var root = path.dirname(require.main.filename);
var conString = "postgres://kean:soraxy31@localhost/Twittur";

exports.pendingUser = function(req,res,next){ //callback function
  if(req.session.isRegistering == true){
    res.sendFile((path.join(root+'/public'+'/Signup.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.regUser = function(req,res,next){
  if(req.session.isRegistering == true){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('INSERT INTO user1 VALUES ($1, $2, $3, $4, FALSE, 1, NULL, $5, $6, 0, FALSE)', [
        req.body.id,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.handle,
        req.body.bio
      ], function(err, result){
    			if (err) return next(err);
    			res.send(result);
          done();
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
}

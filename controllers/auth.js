var pg = require('pg');
var conString = "postgres://kean:soraxy31@localhost/Twittur";

exports.getUsers = function(req,res,next){ //callback function
  pg.connect(conString, function(err, client, done){
    if(err) return console.error('could not connect to pgdb', err);
    client.query('SELECT * FROM user1', function(err, result){
  			if (err) return next(err);
  			res.send(result);
        done();
  	});
  });
};

exports.regPage = function(req,res,next){ //callback function
  req.session.isRegistering = true;
  res.redirect('/register');
};

exports.logIn = function(req,res,next){ //callback function
  pg.connect(conString, function(err, client, done){
    if(err) return console.error('could not connect to pgdb', err);
    client.query('UPDATE user1 SET is_logged_in = TRUE where user_email = $1;',[req.body.email], function(err, result){
  			if (err) return next(err);
        req.session.email = req.body.email;
        req.session.utype = req.body.utype;
        req.session.backURL = req.body.backURL;
  			res.send(result);
        done();
  	});
  });
};

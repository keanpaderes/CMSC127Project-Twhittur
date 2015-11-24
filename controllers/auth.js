var pg = require('pg');
var conString = "postgres://kean:soraxy31@localhost/Twittur";

exports.getUsers = function(req,res,next){ //callback function
  pg.connect(conString, function(err, client, done){
    if(err) return next(err);
    client.query('SELECT * FROM twhittur_user', function(err, result){
  			if (err) return next(err);
  			res.send(result);
        done();
  	});
  });
};

exports.logIn = function(req,res,next){ //callback function
  pg.connect(conString, function(err, client, done){
    if(err) return console.error('could not connect to pgdb', err);
    client.query('UPDATE twhittur_user SET is_logged_in = TRUE where user_email = $1;',[req.body.email], function(err, result){
  			if (err) {
          console.error("ERROR IN UPDATE!", err);
        }
        req.session.email = req.body.email;
  			res.redirect('/normal');
        done();
  	});
  });
};

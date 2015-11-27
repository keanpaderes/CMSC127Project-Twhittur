var pg = require('pg');
var path = require("path"); //for traversing of paths
var root = path.dirname(require.main.filename);
var conString = "postgres://kean:soraxy31@localhost/Twittur";

exports.getUser = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('SELECT * FROM user1 WHERE user_email = $1', [req.session.email], function(err, result){
    			if (err) return next(err);
          res.send(result.rows[0]);
          done();
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.changeHandle = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET admin_handle = $1 where user_email = $2',[req.body.handle, req.session.email], function(err, result){
          if (err) return next(err);
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.changeEmail = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET user_email = $1 where user_email = $2',[req.body.email, req.session.email], function(err, result){
          if (err) return next(err);
          res.session.email = req.body.email;
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.changePassword = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET user_password = $1 where user_email = $2',[req.body.password, req.session.email], function(err, result){
          if (err) return next(err);
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.changeName = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET user_name = $1 where user_email = $2',[req.body.name, req.session.email], function(err, result){
          console.log(req.body.name);
          if (err) return next(err);
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectLanding = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    res.sendFile((path.join(root+'/public'+'/Admin.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectPending = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    res.sendFile((path.join(root+'/public'+'/Pending-Users.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectTrending = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    res.sendFile((path.join(root+'/public'+'/Trending.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectSearch = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    res.sendFile((path.join(root+'/public'+'/Admin-Search.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectSettings = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    res.sendFile((path.join(root+'/public'+'/Admin-Settings.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectSignout = function(req,res,next){ //callback function
  backURL = req.route;
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET is_logged_in = FALSE where user_email = $1',[req.session.email], function(err, result){
          if (err) return next(err);
          req.session.destroy();
          res.redirect('/');
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

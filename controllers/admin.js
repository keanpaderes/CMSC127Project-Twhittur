var pg = require('pg');
var path = require("path"); //for traversing of paths
var root = path.dirname(require.main.filename);
var config = require('./../config/config');
var conString = config.conString;

exports.approve = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET Is_registered = TRUE where user_email = $1;',[req.body.email], function(err, result){
        if (err) {
            console.error("ERROR IN APPROVE!", err);
          }
          console.log(req.body.backURL)
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.disapprove = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('DELETE FROM user1 where user_name = $1;',[req.body.user_name], function(err, result){
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

exports.listPending = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('select user_name from user1 where Is_registered = FALSE;', function(err, result){
        if (err) {
            console.error("ERROR IN VIEWING PENDING USERS!", err);
          }
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.listActive = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('select user_name from normal_tweets, user1 where user1.user_id = normal_tweets.user_id group by user_name order by count(distinct normal_tweets.tweet_id) desc;', function(err, result){
        if (err) {
            console.error("ERROR IN VIEWING ACTIVE USERS!", err);
          }
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.search = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('select user_name, normal_handle, count(distinct normal_tweets.tweet_id) as Tweets, count(distinct normal_favourites.favourite_id) as Favourites, count(distinct normal_retweets.retweet_id) as Retweets from user1, normal_tweets, normal_favourites, normal_retweets  where user1.user_id = normal_tweets.user_id and user1.user_id = normal_favourites.user_id and user1.user_id = normal_retweets.user_id and normal_handle=$1 group by user_name, normal_handle, normal_tweets.user_id, normal_favourites.user_id, normal_retweets.user_id;', [req.body.normal_handle], function(err, result){
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

exports.trendingThisDay = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('select tweet_hashtags from tweet_hashtags,tweet where tweet.tweet_id = tweet_hashtags.tweet_id group by tweet_hashtags order by count(tweet_hashtags) desc;', function(err, result){
        if (err) {
            console.error("ERROR IN VIEWING TRENDING TODAY!", err);
          }
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.trendingThisMonth = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('select tweet_hashtags from tweet_hashtags,tweet where tweet.tweet_id = tweet_hashtags.tweet_id group by tweet_hashtags order by count(tweet_hashtags) desc;', function(err, result){
        if (err) {
            console.error("ERROR IN VIEWING TRENDING THIS MONTH!", err);
          }
          res.send(result);
          done();
      });
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.getUser = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 0){
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
  if(req.session.email && req.session.utype == 0){
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
  if(req.session.email && req.session.utype == 0){
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
  if(req.session.email && req.session.utype == 0){
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
  if(req.session.email && req.session.utype == 0){
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
  if(req.session.email && req.session.utype == 0){
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

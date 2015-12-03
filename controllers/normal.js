var pg = require('pg');
var path = require("path"); //for traversing of paths
var root = path.dirname(require.main.filename);
var config = require('./../config/config');
var conString = config.conString;

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

exports.getTweets = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('SELECT t.tweet_id, u.user_name, u.normal_handle, t.post_time, t.number_of_retweets, t.number_of_favourites, t.tweet_message FROM normal_tweets tweets, user1 u, tweet t where u.user_id = tweets.user_id and tweets.tweet_id = t.tweet_id and u.user_email = $1 order by post_time asc',
         [req.session.email], function(err, result){
    			if (err) return next(err);
          res.send(result.rows);
          done();
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.getRetweets = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('SELECT t.tweet_id, u.user_name, u.normal_handle, t.post_time, t.number_of_retweets, t.number_of_favourites, t.tweet_message FROM normal_favourites tweets, user1 u, tweet t, normal_tweets tw where tweets.favourite_id = t.tweet_id and tw.user_id = u.user_id  and tw.tweet_id = t.tweet_id and tweets.user_id = $1 order by post_time asc',[
        req.body.user_id
      ],function(err, result){
    			if (err) return next(err);
              console.log(req.body.user_id);
              console.log(results);
              res.send(result);
              done();
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.getFavourites = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('SELECT t.tweet_id, u.user_name, u.normal_handle, t.post_time, t.number_of_retweets, t.number_of_favourites, t.tweet_message FROM normal_retweets tweets, user1 u, tweet t, normal_tweets tw where tweets.retweet_id = t.tweet_id and tw.user_id = u.user_id  and tw.tweet_id = t.tweet_id and tweets.user_id = $1 order by post_time asc',[
        req.body.user_id
      ],function(err, result){
    			if (err) return next(err);
              console.log(req.body.user_id);
              console.log(result);
              res.send(result);
              done();
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.getAllTweets = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('SELECT t.tweet_id, u.user_name, u.normal_handle, t.post_time, t.number_of_retweets, t.number_of_favourites, t.tweet_message FROM normal_tweets tweets, user1 u, tweet t where u.user_id = tweets.user_id and tweets.tweet_id = t.tweet_id order by post_time asc',
       function(err, result){
    			if (err) return next(err);
          res.send(result.rows);
          done();
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.postTweet = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('INSERT INTO tweet VALUES ($1, $2, 0, 0, $3)',[
        req.body.tweet_id, req.body.post_time, req.body.tweet_message
      ],function(err, result){
    			if (err) return next(err);
          client.query('INSERT INTO normal_tweets VALUES ($1, $2)',[
            req.body.tweet_id, req.body.user_id
          ],function(err, result){
        			if (err) return next(err);
              res.send(result);
              done();
        	});
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.repliesTweet = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('INSERT INTO replies_to VALUES ($1, $2)',[
        req.body.from_id, req.body.to_id
      ],function(err, result){
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


exports.faveTweet = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('INSERT INTO normal_favourites VALUES ($1, $2)',[
        req.body.tweet_id, req.body.user_id
      ],function(err, result){
    			if (err) return next(err);
          client.query(' UPDATE tweet SET number_of_favourites = number_of_favourites + 1 where tweet_id = $1',[
            req.body.tweet_id
          ], function(err, result){
              if (err) return next(err);
              res.send(result);
              done();
          });
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.retweetTweet = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('INSERT INTO normal_retweets VALUES ($1, $2)',[
        req.body.tweet_id, req.body.user_id
      ],function(err, result){
    			if (err) return next(err);
          client.query(' UPDATE tweet SET number_of_retweets = number_of_retweets + 1 where tweet_id = $1',[
            req.body.tweet_id
          ], function(err, result){
              if (err) return next(err);
              res.send(result);
              done();
          });
    	});
    });
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.getCountTweets = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('select count(distinct normal_tweets.tweet_id) from normal_tweets, user1 where user1.user_id = normal_tweets.user_id and user_email = $1 group by normal_tweets.user_id',[
        req.session.email
      ],function(err, result){
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

exports.getCountFavourites = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('select count(distinct normal_favourites.favourite_id) from normal_favourites, user1 where user1.user_id = normal_favourites.user_id and user_email = $1 group by normal_favourites.user_id',[
        req.session.email
      ],function(err, result){
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

exports.getCountRetweets = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return next(err);
      client.query('select count(distinct normal_retweets.retweet_id) from normal_retweets, user1 where user1.user_id = normal_retweets.user_id and user_email = $1 group by normal_retweets.user_id',[
        req.session.email
      ],function(err, result){
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
      client.query('UPDATE user1 SET normal_handle = $1 where user_email = $2',[req.body.handle, req.session.email], function(err, result){
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

exports.changeDescription = function(req,res,next){ //callback function
  if(req.session.email && req.session.utype == 1){
    pg.connect(conString, function(err, client, done){
      if(err) return console.error('could not connect to pgdb', err);
      client.query('UPDATE user1 SET profile_description = $1 where user_email = $2',[req.body.description, req.session.email], function(err, result){
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
  if(req.session.email && req.session.utype == 1){
    res.sendFile((path.join(root+'/public'+'/Home.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
};

exports.redirectNotifications = function(req,res,next){
  if(req.session.email && req.session.utype == 1){
    res.sendFile((path.join(root+'/public'+'/Notifications.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
}

exports.redirectProfile = function(req,res,next){
  if(req.session.email && req.session.utype == 1){
    res.sendFile((path.join(root+'/public'+'/Profile.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
}

exports.redirectSearch = function(req,res,next){
  backURL = req.route;
  if(req.session.email && req.session.utype == 1){
    res.sendFile((path.join(root+'/public'+'/Search.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
}

exports.redirectSettings = function(req,res,next){
  if(req.session.email && req.session.utype == 1){
    res.sendFile((path.join(root+'/public'+'/Settings.html')));
  } else{
    var backURL = req.session.backURL || '/';
    res.redirect(backURL);
  }
}

exports.redirectSignout = function(req,res,next){
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
}

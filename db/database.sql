DROP TABLE IF EXISTS USER1 CASCADE;
CREATE TABLE USER1 (
  User_id INT PRIMARY KEY UNIQUE NOT NULL,
  User_name VARCHAR(50) NOT NULL,
  User_email VARCHAR(50) UNIQUE NOT NULL,
  User_password VARCHAR(50) NOT NULL,
  Is_logged_in BOOLEAN NOT NULL,
  User_Type INT NOT NULL,
  Admin_handle VARCHAR(50) UNIQUE,
  Normal_handle VARCHAR(50) UNIQUE,
  Profile_description VARCHAR(255),
  Profile_visibility INT,
  Is_registered BOOLEAN
  );

DROP TABLE IF EXISTS TWEET CASCADE;
CREATE TABLE TWEET (
  Tweet_id INT PRIMARY KEY NOT NULL,
  Post_time TIMESTAMPTZ NOT NULL,
  Number_of_retweets INT,
  Number_of_favourites INT,
  Tweet_message varchar(140)
);

DROP TABLE IF EXISTS NORMAL_TWEETS CASCADE;
CREATE TABLE NORMAL_TWEETS (
  Tweet_id INT PRIMARY KEY references TWEET(Tweet_id),
  User_id INT references USER1(User_id)
);

DROP TABLE IF EXISTS NORMAL_FAVOURITES CASCADE;
CREATE TABLE NORMAL_FAVOURITES (
  Favourite_id INT PRIMARY KEY references TWEET(Tweet_id),
  User_id INT references USER1(User_id)
);

DROP TABLE IF EXISTS NORMAL_RETWEETS CASCADE;
CREATE TABLE NORMAL_RETWEETS (
  Retweet_id INT PRIMARY KEY references TWEET(Tweet_id),
  User_id INT references USER1(User_id)
);

DROP TABLE IF EXISTS SEARCHES CASCADE;
CREATE TABLE SEARCHES (
  Searcher_id INT references USER1(User_id),
  Normal_id INT references USER1(User_id),
  Log_time TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS MANAGES CASCADE;
CREATE TABLE MANAGES (
  Admin_id INT references USER1(User_id),
  Normal_id INT references USER1(User_id)
);

DROP TABLE IF EXISTS REPLIES_TO CASCADE;
CREATE TABLE REPLIES_TO (
  Reply_from_id INT references TWEET(Tweet_id),
  Reply_to_id INT references TWEET(Tweet_id)
);

DROP TABLE IF EXISTS TWEET_HASHTAGS CASCADE;
CREATE TABLE TWEET_HASHTAGS (
  Tweet_id INT references TWEET(Tweet_id),
  Tweet_hashtags VARCHAR(140)
);

DROP TABLE IF EXISTS TWEET_MENTIONS CASCADE;
CREATE TABLE TWEET_MENTIONS (
  Tweet_id INT references TWEET(Tweet_id),
  Tweet_mentions VARCHAR(140)
);

INSERT INTO user1 VALUES (1, 'Kean Paderes', 'kean.paderes@gmail.com', 'adminkean', FALSE, 0, '@keantheadmin', NULL, NULL, NULL, NULL);
INSERT INTO user1 VALUES (2, 'Wency Yambao', 'mpyambao@up.edu.ph', 'adminwency', FALSE, 0, '@wencytheadmin', NULL, NULL, NULL, NULL);
INSERT INTO user1 VALUES (3, 'Mike Serato', 'mserato@up.edu.ph', 'adminmike', FALSE, 0, '@miketheadmin', NULL, NULL, NULL, NULL);
INSERT INTO user1 VALUES (4, 'Test Doge', 'doge101@doge.com', 'dogeharthart', FALSE, 1, NULL, '@dogelord', 'doge iz da bomb', 1, TRUE);
INSERT INTO user1 VALUES (5, 'Fifth User', 'fifth@fifthuser.com', 'fifthuser', FALSE, 1, NULL, '@user5', 'user5', 1, FALSE);
INSERT INTO user1 VALUES (6, 'Sixth User', 'sixth@sixthuser.com', 'sixthuser', FALSE, 1, NULL, '@user6', 'user6', 1, FALSE);

INSERT INTO tweet VALUES (1, '2015-11-26 00:01:00', 1, 1, 'ITS ALIVE!');
INSERT INTO tweet VALUES (2, '2015-11-26 00:02:00', 2, 2, 'I cannoli be happy when Im with you. <3');
INSERT INTO tweet VALUES (3, '2015-11-26 00:03:00', 3, 3, 'How many tickles does it take to make a squid laugh? Ten-tickles!');
INSERT INTO tweet VALUES (4, '2015-11-26 00:04:00', 4, 4, 'He made me do it!');
INSERT INTO tweet VALUES (5, '2015-11-26 00:05:00', 5, 5, 'Hi world!');
INSERT INTO tweet VALUES (6, '2015-11-26 00:06:00', 6, 6, 'Words cannot espresso what you mean to me. <3');

insert into normal_tweets values (1, 4);
insert into normal_tweets values (2, 4);
insert into normal_tweets values (3, 4);
insert into normal_tweets values (4, 5);
insert into normal_tweets values (5, 6);

insert into normal_retweets values (3, 4);
insert into normal_retweets values (2, 4);
insert into normal_retweets values (1, 5);
insert into normal_retweets values (3, 5);
insert into normal_retweets values (5, 5);
insert into normal_retweets values (1, 6);

insert into normal_favourites values (3, 4);
insert into normal_favourites values (5, 5);
insert into normal_favourites values (1, 6);

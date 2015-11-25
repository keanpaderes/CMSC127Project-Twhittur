DROP TABLE IF EXISTS TWHITTUR_USER CASCADE;
CREATE TABLE TWHITTUR_USER (
  User_id INT PRIMARY KEY NOT NULL,
  User_name VARCHAR(50) NOT NULL,
  User_email VARCHAR(50) NOT NULL,
  User_password VARCHAR(50) NOT NULL,
  Is_logged_in BOOLEAN NOT NULL,
  User_Type INT NOT NULL,
  Admin_handle VARCHAR(50),
  Normal_handle VARCHAR(50),
  Profile_description VARCHAR(255),
  Profile_visibility INT,
  Is_registered BOOLEAN
  );

DROP TABLE IF EXISTS TWEET CASCADE;
CREATE TABLE TWEET (
  Tweet_id INT PRIMARY KEY NOT NULL,
  Post_time TIMESTAMP NOT NULL,
  Number_of_retweets INT,
  Number_of_favourites INT,
  Tweet_message varchar(140)
);

DROP TABLE IF EXISTS NORMAL_TWEETS CASCADE;
CREATE TABLE NORMAL_TWEETS (
  User_id INT PRIMARY KEY references TWHITTUR_USER(User_id),
  Tweet_id INT references TWEET(Tweet_id) UNIQUE
);

DROP TABLE IF EXISTS NORMAL_FAVOURITES CASCADE;
CREATE TABLE NORMAL_FAVOURITES (
  User_id INT PRIMARY KEY references TWHITTUR_USER(User_id),
  Favourite_id INT references TWEET(Tweet_id) UNIQUE
);

DROP TABLE IF EXISTS NORMAL_RETWEETS CASCADE;
CREATE TABLE NORMAL_RETWEETS (
  User_id INT PRIMARY KEY references TWHITTUR_USER(User_id),
  Retweet_id INT references TWEET(Tweet_id) UNIQUE
);

DROP TABLE IF EXISTS SEARCHES CASCADE;
CREATE TABLE SEARCHES (
  Searcher_id INT PRIMARY KEY references TWHITTUR_USER(User_id),
  Normal_id INT references TWHITTUR_USER(User_id),
  Log_time TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS MANAGES CASCADE;
CREATE TABLE MANAGES (
  Admin_id INT PRIMARY KEY references TWHITTUR_USER(User_id),
  Normal_id INT references TWHITTUR_USER(User_id)
);

DROP TABLE IF EXISTS REPLIES_TO CASCADE;
CREATE TABLE REPLIES_TO (
  Reply_from_id INT references TWEET(Tweet_id),
  Reply_to_id INT references TWEET(Tweet_id)
);

DROP TABLE IF EXISTS TWEET_HASHTAGS CASCADE;
CREATE TABLE TWEET_HASHTAGS (
  Tweet_id INT PRIMARY KEY references TWEET(Tweet_id),
  Tweet_hashtags VARCHAR(140)
);

DROP TABLE IF EXISTS TWEET_MENTIONS CASCADE;
CREATE TABLE TWEET_MENTIONS (
  Tweet_id INT PRIMARY KEY references TWEET(Tweet_id),
  Tweet_mentions VARCHAR(140)
);

INSERT INTO twhittur_user VALUES (1, 'Kean Paderes', 'kean.paderes@gmail.com', 'adminkean', FALSE, 0, 'menameisKEAN', NULL, NULL, NULL, NULL);
INSERT INTO twhittur_user VALUES (2, 'Wency Yambao', 'mpyambao@up.edu.ph', 'adminwency', FALSE, 0, 'wencytheadmin', NULL, NULL, NULL, NULL);
INSERT INTO twhittur_user VALUES (3, 'Mike Serato', 'mserato@up.edu.ph', 'adminmike', FALSE, 0, 'wencytheadmin', NULL, NULL, NULL, NULL);
INSERT INTO twhittur_user VALUES (4, 'Test Doge', 'doge101@doge.com', 'dogeharthart', FALSE, 1, NULL, 'dogelord', 'doge iz da bomb', 0, TRUE);

var auth =  require('./../controllers/auth');
var register =  require('./../controllers/register');
var normal =  require('./../controllers/normal');
var admin =  require('./../controllers/admin');

module.exports = function(router){ //exporting to other modules
	//Registering and Logging in
	router.route('/auth')
		.get(auth.getUsers)
		.post(auth.regPage)
		.put(auth.logIn);
	router.route('/register')
		.get(register.pendingUser)
		.post(register.regUser);
	//Normal User
	router.route('/init-all-tweets')
		.get(normal.getAllTweets);
	router.route('/init-tweets')
		.get(normal.getTweets);
	router.route('/init-user')
		.get(normal.getUser);
	router.route('/init-count-tweets')
		.get(normal.getCountTweets);
	router.route('/init-count-favourites')
		.get(normal.getCountFavourites);
	router.route('/init-count-retweets')
		.get(normal.getCountRetweets);
	router.route('/normal')
		.get(normal.redirectLanding)
		.post(normal.postTweet);
	router.route('/notifications')
		.get(normal.redirectNotifications);
	router.route('/profile')
		.get(normal.redirectProfile);
	router.route('/search')
		.get(normal.redirectSearch);
	router.route('/settings')
		.get(normal.redirectSettings);
	router.route('/change-handle')
		.put(normal.changeHandle);
	router.route('/change-email')
		.put(normal.changeEmail);
	router.route('/change-password')
		.put(normal.changePassword);
	router.route('/change-name')
		.put(normal.changeName);
	router.route('/change-description')
		.put(normal.changeName);
	router.route('/signout')
		.get(normal.redirectSignout);
	//Admin
	router.route('/init-admin')
		.get(admin.getUser);
	router.route('/admin')
		.get(admin.redirectLanding);
	router.route('/admin-pending')
		.get(admin.redirectPending);
	router.route('/admin-trending')
		.get(admin.redirectTrending);
	router.route('/admin-search')
		.get(admin.redirectSearch);
	router.route('/admin-settings')
		.get(admin.redirectSettings);
	router.route('/change-admin-handle')
		.put(admin.changeHandle);
	router.route('/change-admin-email')
		.put(admin.changeEmail);
	router.route('/change-admin-password')
		.put(admin.changePassword);
	router.route('/change-admin-name')
		.put(admin.changeName);
	router.route('/admin-signout')
		.get(admin.redirectSignout);
	return router;
};

var auth =  require('./../controllers/auth');
var normal =  require('./../controllers/normal');

module.exports = function(router){ //exporting to other modules
	//student
	router.route('/auth')
		.get(auth.getUsers)
		.post(auth.logIn);
	router.route('/normal')
		.get(normal.redirectLanding);
	return router;
};

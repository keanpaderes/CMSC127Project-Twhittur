var auth =  require('./../controllers/auth');
var register =  require('./../controllers/register');
var normal =  require('./../controllers/normal');
var admin =  require('./../controllers/admin');

module.exports = function(router){ //exporting to other modules
	//student
	router.route('/auth')
		.get(auth.getUsers)
		.post(auth.regPage)
		.put(auth.logIn);
	router.route('/register')
		.get(register.pendingUser)
		.post(register.regUser);
	router.route('/normal')
		.get(normal.redirectLanding);
	router.route('/admin')
		.get(admin.redirectLanding);
	return router;
};

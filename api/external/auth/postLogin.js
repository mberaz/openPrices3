/* global global */
module.exports.do = function (req, res, next) {

	var User = global.Objects.User;
	var jwt = require('jsonwebtoken');

	var userName = req.body.UserName;
	var password = req.body.Password;

	new User({ userName: userName, password: password }).fetch().then(function (model) {
		var user = {
			Id: model.attributes.id,
			UserName: model.attributes.userName,
			Password: model.attributes.password,
			IsAdmin: model.attributes.isAdmin,
		};

		var token = jwt.sign(user, global.Settings.secret, {
			expiresInMinutes: global.Settings.tokenExpiresInMinutes
		});

		res.json({
			Status: true,
			Message: 'Enjoy your new user!',
			UserId: user.Id,
			Token: token
		});
		return;

	}).catch(function (error) {
		console.log(error);
		res.json({ Status: false, Message: 'Wrong user or password.' });
		return;
    });
};


/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = '5edc0f9cdef5d177ad6f7c6d1a64126d';
var util = require('util');

module.exports = {

	login: function(req, res) {
	    passport.authenticate('local', function(err, user, info) {
	        console.log('user ' + util.inspect(user));
	        console.log('info ' + util.inspect(info));
	        console.log('err ' + util.inspect(err));
	        if (!user) {
	            res.send({
	                success: false,
	                message: 'invalidPassword'
	            });
	            return;
	        }else{
	            if (err) {
	                res.send({
	                    success: false,
	                    message: 'unknownError',
	                    error: err
	                });
	            } else {
	                
	                var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
	                res.send({
	                    success: true,
	                    user: user,
	                    token: token
	                });
	            }
	        }
	    })(req, res);
	},

	logout: function(req, res) {
	    req.logout();
	    res.send({
	        success: true,
	        message: 'logoutSuccessful'
	    });
	},
	_config: {}
	
};


'use strict';

/**
 * Login controller
 *
 * @author Øyvind Hellenes
 */

var app = angular.module('corsaneApp');

app.controller('LoginCtrl', ['$scope', '$location','$log','authService','$cookieStore','api', '$state', '$rootScope','global','userService',
    function($scope, $location, $log, authService, $cookieStore, api, $state, $rootScope, global, userService) {

            $scope.loginCredentials = {};
            $scope.registerCredentials = {};
            $scope.validationErrors = [];

            // Load the SDK asynchronously
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

			$scope.login = function(credentials){
				var success = function(data){
                    console.log('data' + angular.toJson(data));

                    $rootScope.isLoggedIn = true;

                    // Store the oauth data
                    $rootScope.oauth = data;

                    // Also store it in cookie
                    $cookieStore.put('oauth', data);

                    userService.user(data.user[0].id)
                    .success(function (resp){
                        console.log('resp' + angular.toJson(resp));
                        $rootScope.user = resp;
                    })
                    .error(function (resp){
                        $log.info('Not working');
                    });
                    
                    $state.go('home');
				};

				var loginError = function(err) {
                    $scope.validationErrors = [];
                    $scope.validationErrors.push("Incorrect username/password combination.");
                };

				// Sends credentials with responses to the authentication service
				authService.login(credentials).success(success).error(loginError);
			};

            $scope.register = function(credentials){

                var success = function(data) {
                    $scope.login(credentials);
                };

                var registerError = function(err) {
                    $scope.validationErrors = [];

                    for (var field in err.errors.children) {
                        if (err.errors.children[field].length === 0) {
                            continue;
                        }

                        err.errors.children[field].errors.forEach(function (element) {
                            $scope.validationErrors.push(element);
                        });
                    }
                };

                // Sends credentials with responses to the authentication service
                authService.register(credentials).success(success).error(registerError);
            };

            $scope.isLogin = function(value){
                return value == 'leadText';
            }

            $scope.isValidEmail = function(email){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
                            }
		}
	]);

'use strict';

/**
 * Facebook Login controller
 *
 * @author Dag Vikan
 */

angular.module('corsaneApp')
	.controller('FacebookLoginController', ['$scope', '$location','$log','authService','$cookieStore','api', '$state', '$rootScope','global','userService',
		function($scope, $location, $log, authService, $cookieStore, api, $state, $rootScope, global, userService) {

            $scope.facebookLogout = function () {
                FB.logout(function(response) {
                    // Person is now logged out
                    checkLoginState();
                });

            };
        }]);


// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
console.log('Welcome!  Fetching your information.... ');
FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}

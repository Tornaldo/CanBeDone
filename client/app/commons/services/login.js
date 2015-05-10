'use strict';
/**
 * Factory for authentication. Not implemented backend yet.
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('authService', ['$http', 'config','$rootScope',
    function($http, config, $rootScope) {
      return {
        login: function(credentials) {
            var loginString = config.baseUrl
                + 'auth/login?';

            loginString += 'username=' + credentials.email;
            loginString += '&password=' + credentials.password;

            return $http.get(loginString);

        },
        logout: function(){
            var loginString = config.baseUrl
                + 'auth/logout';

            return $http.get(loginString);
        },
        register: function (credentials) {
            return $http.post(config.baseUrl + 'user/create', JSON.stringify({
                fullName: credentials.username,
                password: credentials.password,
                username: credentials.email
            }));
        },
      }
    }
  ]);

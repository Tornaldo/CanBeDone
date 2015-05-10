/**
 * @ngdoc service 
 * @name cbdCommon.sessionManager
 * @requires sessionStorage 
 * @requires $rootScope 
 * @requires api 
 * @description SessionManager take care of configuring a session.
 * Putting data in localStorage, rootscope and in http header.
 * SessionManager can be used on application init, to see if 
 * user is already logged in (Has token), and when user has logged in,
 * or logging out
 * 
**/
angular.module('cbdCommon').
factory('sessionManager', ['sessionStorage', '$rootScope', 'api',
 function (sessionStore, $rootScope, api) {

    return {
        setupSession: function(username, token) {
            sessionStorage.put('username', username);
            sessionStorage.put('token', token);

            $rootScope.isLoggedIn = true;
            $rootScope.username = username;
            $rootScope.$broadcast('event.loggedIn', username);

            api.init(token);
        },

        isStoredSession: function() {
            var token = sessionStorage.get('token');
            if (token !== null) {
                return true;
            }
            else {
                return false;
            }
        },

        destroySession: function() {
            sessionStorage.remove('username');
            sessionStorage.remove('token');

            $rootScope.isLoggedIn = false;
            $rootScope.username = null;
            $rootScope.$broadcast('event.loggedOut');

        }
    

    };

}])

/**
 * @ngdoc service 
 * @name cbdCommon.sessionStorage
 * @requires $window 
 * @description A wrapper service for $window.localStorage.
 * Data can be put into localStorage, and will persist even
 * if user exit site. Data will disappear when user close
 * the browser tab. Different browser tabs does not share
 * the same localStorage. 
 *
 * TODO: cookieStore or localStorage?
 * 
**/
.factory('sessionStorage', ['$window', function ($window) {

    return {
        put: function(key, value) {
            $window.localStorage.setItem(key, value);
        },

        get: function(key) {
            return $window.localStorage.getItem(key);
        },
        remove: function(key) {
            $window.localStorage.setItem(key, null);
        }

    };

}])


/**
 * @ngdoc service 
 * @name cbdCommon.api
 * @requires $http 
 * @description Puts the authentication token into the header of 
 * subsequent http request.
 * 
**/
.factory('api', ['$http', function ($http) {
    return {
        init: function (token) {
            $http.defaults.headers.common['XXX'] = token;
        },

        destroy: function () {
            $http.defaults.headers.common['XXX'] = undefined;
        }
    };
}]);
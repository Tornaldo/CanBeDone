'use strict';
/**
 * Factory for adding token to headers
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('api', ['$http', '$cookies',
    function($http, $cookies) {
      return {
            // todo: Deprecated
            init: function (token) {
                //$http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
                //$http.defaults.headers.common['Access-Control-Allow-Origin'] = 'localhost:9000'
            }
        };
    }
  ]);
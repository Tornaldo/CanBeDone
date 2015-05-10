'use strict';
/**
 * Factory for intercepting http requests and responses
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .factory('httpInterceptor', ['$q', '$location',
    function($q, $location) {
      return function (promise) {
        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                $location.url('/login');
            }

            return $q.reject(response);
        };

        return promise.then(success, error);
      };
    }
  ]);
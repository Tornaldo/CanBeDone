'use strict';
/**
 * Factory for authentication. Not implemented backend yet.
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('ratingService', ['$http', 'config','$rootScope','$resource','$log',
    function($http, config, $rootScope, $resource, $log) {
      return {
        get: function(){
            var userString = config.baseUrl
                + 'user?';

            return $http.get(userString);

        },
        like: function(id, type){

            $http.post(config.apiBaseUrl + 'ratings?'+ type + 'Id=' + id + '&isLike=1').success(function(data) {
              // if (type == 'topic') {
              //   $rootScope.user.topics.push(data.topics[0]);
              // }
              // else {
              //   $rootScope.user.lists.push(data.lists[data.lists.length-1]);
              // }
              

            }).error(function(error, data, status, config) {
              $log.info("It doesnt work!" + data + config);
            });
        },
        dislike: function(id, type){

            $http.post(config.apiBaseUrl + 'ratings?'+ type + 'Id=' + id + '&isLike=0&isDislike=1').success(function(data) {
              // if (type == 'topic') {
              //   $rootScope.user.topics.push(data.topics[0]);
              // }
              // else {
              //   $rootScope.user.lists.push(data.lists[data.lists.length-1]);
              // }
              

            }).error(function(error, data, status, config) {
              $log.info("It doesnt work!" + data + config);
            });
        },
      }
    }
  ]);

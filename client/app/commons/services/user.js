'use strict';
/**
 * Factory for authentication. Not implemented backend yet.
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('userService', ['$http', 'config','$rootScope','$resource','$log',
    function($http, config, $rootScope, $resource, $log) {
      return {
        user: function(id){
            var userString = config.baseUrl
                + 'user/'+ id;

            return $http.get(userString);

        },
        isLoggedIn: function() {
            return $rootScope.isLoggedIn;
        },
        star: function(id, type){

            $http.post(config.apiBaseUrl + 'users/starorunstaritems?'+ type + 'Id=' + id).success(function(data) {
              $log.info('topics log' + data.topics[data.topics.length-1]);
              $log.info('topics log' + angular.toJson(data));
              if (type == 'topic') {
                $rootScope.user.topics.push(data.topics[data.topics.length-1]);
              }
              else {
                $rootScope.user.lists.push(data.lists[data.lists.length-1]);
              }
              

            }).error(function(error, data, status, config) {
              $log.info("It doesnt work!" + data + config);
            });
        },
        unstar: function(id, type){
            $http.post(config.apiBaseUrl + 'users/starorunstaritems?' + type + 'Id=' + id + '&unstar=1').success(function(data) {
              if (type == 'topic') {
                for (var i in $rootScope.user.topics) {
                  if ($rootScope.user.topics[i].topicId == id) {
                    $rootScope.user.topics.splice(i, 1);
                  };
                }        
              }
              else {
                for (var i in $rootScope.user.lists) {
                  if ($rootScope.user.lists[i].id == id) {
                    $rootScope.user.lists.splice(i, 1);
                  };
                } 
              }
            }).error(function(error, data, status, config) {
              $log.info("It doesnt work!" + data + config);
            });
        }
      }
    }
  ]);

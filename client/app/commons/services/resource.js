'use strict';

/**
 * Factory for handling resources
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('resourceService', ['$http', '$log', '$resource', '$sce', 'listService', 'global', 'config', 'collectionService','$rootScope', '$q',
    function($http, $log, $resource, $sce, listService, global, config, collectionService, $rootScope, $q) {

      return {
        post: function(url, collection) {
          var q = $q.defer();
          // Post resource
          $http.post(config.baseUrl + 'resource?url=' + url).success(function(data) {
            q.resolve(data);
            collectionService.add_resource(collection, data);
            var bool = global.toPlaylist();
            $rootScope.loading.value = false;

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });

          return q.promise;

        },
        get: function(id) {
          var tmp = $resource(config.baseUrl + 'resource?id=' + id, {
            id: '@id'
          }, {
            'query': {
              method: 'GET',
              isArray: false
            }
          });

          return tmp.query();
        },
        note: function(text, id){
          $http.post(config.baseUrl + 'resource/update/'+ id +'?note=' + text).success(function(data) {
            
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        vote: function(vote, id) {
          $http.post(config.baseUrl + 'resource/addvote?id='+ id +'&vote=' + vote + '&voter=' + $rootScope.user.id).success(function(data) {
            
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        }

      }
    }
  ]);
'use strict';

/**
 * Factory for handling resources
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('collectionService', ['$http', '$log', '$resource', '$sce', 'listService', 'global', 'config','$q','$rootScope',
    function($http, $log, $resource, $sce, listService, global, config, $q, $rootScope) {

      return {
        create: function(name, desc) {
          // Post resource
          var q = $q.defer();

          $http.post(config.baseUrl + 'collection/create?name=' + name + '&poster=' + $rootScope.user.id).success(function(data) {
            q.resolve(data);
            
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
          return q.promise;

        },
        get: function(id){
          var tmp = $resource(config.baseUrl + 'collection?id=' + id, {
            id: '@id'
          }, {
            'query': {
              method: 'GET',
              isArray: false
            }
          });

          return tmp.query();

        },
        getall: function(){
          var tmp = $resource(config.baseUrl + 'collection/', {
          }, {
            'query': {
              method: 'GET',
              isArray: true
            }
          });

          return tmp.query();
        },
        star: function(collection){
          $http.post(config.baseUrl + 'user/'+ $rootScope.user.id +'/collections/add?id=' + collection.id).success(function(data) {
            $rootScope.user.collections.push(collection);
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        unstar: function(id){
          $http.post(config.baseUrl + 'user/'+ $rootScope.user.id +'/collections/remove?id=' + id).success(function(data) {
            for (var i in $rootScope.user.collections){
              if ($rootScope.user.collections[i].id == id) {
                $rootScope.user.collections.splice(i, 1);
              };
            }
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        description: function(desc, id){
          $http.post(config.baseUrl + 'collection/update/'+ id +'?description=' + desc).success(function(data) {
            $rootScope.user.collections.description = desc;
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        image: function(url, id){
          var q = $q.defer();
          $http.post(config.baseUrl + 'collection/update/'+ id +'?image_url=' + url).success(function(data) {
            q.resolve(data);
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });

          return q.promise;
        },
        add_resource: function(collection, resource){
          $http.post(config.baseUrl + 'collection/'+ collection.id +'/resources/add?id=' + resource.id).success(function(data) {
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        remove_resource: function(collectionId, resource){
          $http.post(config.baseUrl + 'collection/'+ collectionId +'/resources/remove?id=' + resource.id).success(function(data) {
          
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        add_subcollection: function(collection, subcollection){
          $http.post(config.baseUrl + 'collection/addsubcollection?id=' + collection.id + '&subid=' + subcollection.id).success(function(data) {
            collection.subCollections.push(subcollection);
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        }

      }
    }
  ]);
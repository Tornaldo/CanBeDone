'use strict';

/**
 * Factory for handling resources
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('topicService', ['$http', '$log', '$resource', '$sce', 'listService', 'global', 'config','$q','$rootScope',
    function($http, $log, $resource, $sce, listService, global, config, $q, $rootScope) {

      return {
        post: function(name, desc) {
          // Post resource
          var q = $q.defer();

          $http.post(config.apiBaseUrl + 'topics?name=' + name).success(function(data) {
            q.resolve(data.topicId);
            $rootScope.user.topics.push(data);
          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
          return q.promise;

        },
        getTopics: function(id) {
          if (id) {
            var tmp = $resource(config.apiBaseUrl + 'topic?id='+id, {
              id: '@id'
            }, {
              'query': {
                method: 'GET',
                isArray: true
              }
            });
          }
          else {

            var tmp = $resource(config.apiBaseUrl + 'topic', {
              id: '@id'
            }, {
              'query': {
                method: 'GET',
                isArray: true
              }
            });
          };         
          return tmp.query();      
        },
        addResource: function(topicId, resource) {
          if (!resource) {
            var resource = global.setResource();
          };
          // Post resource
          $http.post(config.apiBaseUrl + 'topics/addtotopics?topicId=' + topicId + '&resourceId=' + resource.id).success(function(data) {

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        addPlaylist: function(topicId, list, lists){
          // Post resource
          $http.post(config.apiBaseUrl + 'topics/addtotopics?topicId=' + topicId + '&listId=' + list.id).success(function(data) {
            //var tmp = global.setSearchRes();
            lists.push(list);

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        },
        getTopicElements: function(topicId) {
          var tmp = $resource(config.apiBaseUrl + 'searches?topicId='+ topicId, {
            id: '@id'
          }, {
            'query': {
              method: 'GET',
              isArray: false
            }
          });
          return tmp.query();
        },
        autocomplete: function(term){
          var tmp = $resource(config.apiBaseUrl + 'searches/' + term + '/autocomplete', {
            id: '@id'
          }, {
            'query': {
              method: 'GET',
              isArray: true
            }
          });
          return tmp.query();
        },
        postImage: function(url, topic){
          // Post image
            var q = $q.defer();
          $http.post(config.apiBaseUrl + 'others/addimages?topicId=' + topic.topicId + '&imageUrl=' + url).success(function(data) {
            
            q.resolve(data.url);
            

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });

          return q.promise;
        },
        postDesc: function(desc, topic){
          // Post description
          var q = $q.defer();
          $http.post(config.apiBaseUrl + 'others/addescriptions?description=' + desc + '&topicId=' + topic.topicId).success(function(data) {
            
            q.resolve(data.description);
            $log.info("url" + data.description);
            

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });

          return q.promise;
        },
        addSubTopic: function(topicId, subtopicIds){


          $http.post(config.apiBaseUrl + 'others/listofthings?subtopicsOfTopicId=' + topicId + '&ids=' + subtopicIds).success(function(data) {

          }).error(function(error, data, status, config) {
            $log.info("It doesnt work!" + data + config);
          });
        }

      }
    }
  ]);
'use strict';
/**
 * Factory for handling files
 *
 * @author Øyvind Hellenes
 */
angular.module('corsaneApp')
  .factory('fileService', ['$http', '$log', '$resource', 'global', 'config',
    function($http, $log, $resource, global, config) {

      return {
        post: function(file) {
          // var res = $resource(config.apiBaseUrl + 'files/files', {
          //   id: '@id'
            
          // }, {
          //   method: 'POST'
          // });
          var fd = new FormData();
          fd.append('file', file);
          $log.info('data:' + angular.toJson(fd));
          $http.post(config.apiBaseUrl + 'files/files', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }).success(function(data) {
            $log.info('It worked!' + angular.toJson(data));
          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
          });

        },
        get: function(id) {          
          var res = $resource(config.apiBaseUrl + 'file/filedownload?fileId=' + id, {}, // Query parameters
              {
                'query': {
                  method: 'GET',
                  isArray: false
                }
              });
          return res.query();
        }

      }
    }
  ]);
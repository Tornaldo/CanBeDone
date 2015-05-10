'use strict';
/**
 * Factory for handling playlists and updating view accordingly
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .factory('listService', ['$http', '$log', '$resource', '$sce', 'global', 'config', '$filter', '$state', '$rootScope','$q',
    function($http, $log, $resource, $sce, global, config, $filter, $state, $rootScope, $q) {

      return {
        addList: function(name) {
          // Post resource 
          var q = $q.defer();

          $http.post(config.apiBaseUrl + 'lists/addlists?name=' + name).success(function(data) {
            q.resolve(data);
            $rootScope.user.lists.push(data);
            $log.info('It worked!' + data);
          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
            $state.go('login');
          });

          return q.promise;
        },
        getLists: function() {
          var res = $resource(config.apiBaseUrl + 'lists', {
            id: '@id'
          }, {});
          return res.query();
        },
        addListElement: function(playlist, resource) {
          if (!resource) {
            var resource = global.setResource();
          };
          if (playlist.section_id) {
            $http.post(config.apiBaseUrl + 'lists/addlistelements?resourceId=' + resource.id + '&listSectionId=' + playlist.section_id).success(function(data) {

            }).error(function(error, data, status, config) {
              $log.info("It doesnt work!" + data + config);
            });
          } else {
            $http.post(config.apiBaseUrl + 'lists/addlistelements?resourceId=' + resource.id + '&listId=' + playlist.id).success(function(data) {

            }).error(function(error, data, status, config) {
              $log.info("It doesnt work!" + data + config);
            });
          }
        },
        changeListName: function(playlist, newName) {
          if (playlist.section_id) {
            $http.post(config.apiBaseUrl + 'lists/editsections?listSectionId=' + playlist.section_id + '&name=' + newName).success(function(data) {
              $log.info('It worked!' + data);
            }).error(function(error, data, status, config) {
              $log.info('It doesnt work!' + data + config);
            });
          } else {

            $http.post(config.apiBaseUrl + 'lists/editlists?listId=' + playlist.id + '&name=' + newName).success(function(data) {
              $log.info('It worked!' + data);
            }).error(function(error, data, status, config) {
              $log.info('It doesnt work!' + data + config);
            });
          }

        },
        removeList: function(playlistId, idx) {
          $http.post(config.apiBaseUrl + 'lists/removelists?listId=' + playlistId).success(function(data) {
            $log.info('It worked!' + data);
            var tmp = global.lists();
            tmp.value.splice(idx, 1);
          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
          });
        },
        removeListElement: function(listElement, playlist, idx, listElements) {
          // Deletes resource from list
          $http.post(config.apiBaseUrl + 'lists/removelistelements?listElementId=' + listElement.list_element_id + '&listId=' + playlist.value.id).success(function(data) {

            listElements.splice(idx, 1);
            $log.info('It worked!' + data);
          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
          });
        },
        addListSection: function(list, name, lead) {
          // var playlist = global.setList();
          // var parentSectionId = "";
          // if (list.section_id) {
          //   parentSectionId = '&parentSectionId=' + list.section_id;
          // };

          $http.post(config.apiBaseUrl + 'lists/addlistsections?listId=' + list.id + '&name=' + name + '&description=' + lead).success(function(data) {
            $log.info('It worked!' + data);

            list.elements.push(data);


          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
          });

        },
        removeListSection: function(sublist, idx, listElements) {
          // Deletes resource from list
          var playlist = global.setList();
          $http.post(config.apiBaseUrl + 'lists/removelistsections?listSectionId=' + sublist.section_id + '&listId=' + playlist.value.id).success(function(data) {
            listElements.splice(idx, listElements.length);
            $log.info('It worked!' + data);
          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
          });
        },
        getElements: function(playlist) {
          // Get all resources in a playlist.
          if (playlist.section_id) {
            var getElements = $resource(
              config.apiBaseUrl + 'lists/elementsinsection?sectionId=' + playlist.section_id, {}, // Query parameters
              {
                'query': {
                  method: 'GET',
                  isArray: false
                }
              });
          } else {
            var getElements = $resource(
              config.apiBaseUrl + 'lists/' + playlist.id, {}, // Query parameters
              {
                'query': {
                  method: 'GET',
                  isArray: false
                }
              });
          }

          return getElements.query();
        },
        getElementsToAdd: function(playlist, add) {
          if (playlist.section_id) {
            var getElements = $resource(
              config.apiBaseUrl + 'lists/elementsinsection?sectionId=' + playlist.section_id, {}, // Query parameters
              {
                'query': {
                  method: 'GET',
                  isArray: false
                }
              });
          } else {
            var getElements = $resource(
              config.apiBaseUrl + 'lists/elementsinlist?listId=' + playlist.id, {}, // Query parameters
              {
                'query': {
                  method: 'GET',
                  isArray: false
                }
              });
          }

          getElements.query().$promise.then(function(data) {
            $log.info('data' + angular.toJson(data, 'pretty'));
            var listArray = [];
            for (var i in data.elements) {
              if (data.elements[i].list_element_type == 'list_section') {
                listArray.push(data.elements[i]);
              };
            }
            if (listArray.length > 0) {
              add.value.push(listArray);
            }

          });
        },
        moveListElement: function(playlist, resource, newIdx) {
          if (playlist.section_id) {
            $http.post(config.apiBaseUrl + 'lists/movelistelements?listElementId=' + resource.list_element_id + '&listSectionId=' + playlist.section_id + '&indexInSection=' + newIdx).success(function(data) {
              $log.info('It worked!' + data);
            }).error(function(error, data, status, config) {
              $log.info('It doesnt work!' + data + config);
            });
          } else {
            $http.post(config.apiBaseUrl + 'lists/movelistelements?listElementId=' + resource.list_element_id + '&listId=' + playlist.id + '&indexInList=' + newIdx).success(function(data) {
              $log.info('It worked!' + data);
            }).error(function(error, data, status, config) {
              $log.info('It doesnt work!' + data + config);
            });

          }
        },
        moveListElements: function(playlist, newListOrder) {
          $http.post(config.apiBaseUrl + 'lists/editpositionings?listId=' + playlist.id + '&listElementIds=' + newListOrder).success(function(data) {
            $log.info('It worked!' + data);

          }).error(function(error, data, status, config) {
            $log.info('It doesnt work!' + data + config);
          });
        },
        getListById: function(id) {
          var res = $resource(
            config.apiBaseUrl + 'lists/' + id, {}, // Query parameters
            {
              'query': {
                method: 'GET',
                isArray: false
              }
            });
          return res.query();
        },


      }
    }
  ]);
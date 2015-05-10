'use strict';

/**
 * Factory for holding global variables
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .factory('global', ['$http', '$log', '$resource', '$sce',
    function($http, $log, $resource, $sce) {

      var isPlaylist = {
        value: false
      };

      var toPlaylist = {
        value: false
      };

      var setResource = {
        value: null
      };

      var setList = {
        value: null
      };

      var lists = {
        value: null
      };

      var setTopic = {
        value: null
      }

      var showSubmit = {
        value: false
      }

      var searchRes = {
        value: "",
        lists: "",
        topic: ""
      }

      var user = {
        value: null
      }

      var tmpTopicId = {
        value: ""
      }

      return {
        isPlaylist: function(bool) {
          if (bool !== undefined) {
            isPlaylist.value = bool;
          }
          return isPlaylist;

        },
        setList: function(list) {
          if (list) {
            setList.value = list;
          };
          return setList;
        },
        setResource: function(resource) {
          if (resource || resource === false) {
            setResource.value = resource;
            // Makes sure url is trustworthy.
            if (setResource.value.url) {

              setResource.value.url = $sce.trustAsResourceUrl(String(setResource.value.url));
            };
          };
          
          return setResource.value;
        },
        lists: function(playlists) {
          if (playlists) {
            lists.value = playlists;
          };
          return lists
        },
        
        toPlaylist: function(bool) {
          if (bool) {
            toPlaylist.value = bool;
          };
          return toPlaylist;
        },

        setTopic: function(topic){
          if (topic) {
            setTopic.value = topic;
            $log.info('topic2' + topic.name);

          };
          return setTopic;
        },

        showSubmit: function(bool){
          if (bool) {
            showSubmit.value = bool;
          };
          return showSubmit;
        },
        setSearchRes: function(res){
          if (res) {
            searchRes.value = res;
          };
          return searchRes;
        },

        user: function(u){
          if (u) {
            user.value = u;
          };
          return user;
        },
        topicId: function(u){
          if (u) {
            tmpTopicId.value = u;
          };
          return tmpTopicId;
        },

      }
    }
  ]);
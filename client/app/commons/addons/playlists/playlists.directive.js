'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('playlists', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
          restrict: 'E',
          scope: {
            playlist: '=',
          },
          templateUrl: 'commons/addons/playlists/playlists.html',
          controller: 'SearchCtrl'

        };
    }
  ]);
'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('myplaylists', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'MyPlaylistsCtrl',
        templateUrl: 'components/myplaylists/myplaylists.html',
        link: function($scope, element, attrs) {
           
        }
      };
    }
  ]);
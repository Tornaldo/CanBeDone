'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('playlistbar', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'PlaylistbarCtrl',
        templateUrl: 'components/playlistbar/playlistbar.html',
        link: function($scope, element, attrs) {
           
        }
      };
    }
  ]);
'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('mytopics', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'MyTopicsCtrl',
        templateUrl: 'components/mytopics/mytopics.html',
        link: function($scope, element, attrs) {
           
        }
      };
    }
  ]);
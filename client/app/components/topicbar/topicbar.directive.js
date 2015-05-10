'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('topicbar', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        scope: {
          lists: "=",
          topic: "=",

        },
        controller: 'topicbarCtrl',
        templateUrl: 'components/topicbar/topicbar.html',
        link: function($scope, element, attrs) {
           
        }
      };
    }
  ]);
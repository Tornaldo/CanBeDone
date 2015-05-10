'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('submit', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        scope: {
          elements: '=',
          collection: "="
        },
        controller: 'SubmitCtrl',
        templateUrl: 'components/submit/submit.html',
        link: function($scope, element, attrs) {
           
        }
      };
    }
  ]);
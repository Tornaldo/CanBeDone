'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('addplaylist', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'MyContentCtrl',
        template: '<p id="addplaylist" ng-click=""><span class="glyphicon glyphicon-plus"></span> Add playlist </p>',
        link: function($scope, element, attrs) {

        }
      };
    }
  ]);
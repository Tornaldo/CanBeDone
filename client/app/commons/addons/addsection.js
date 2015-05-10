'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('addsection', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        scope: {
          elements: '='
        },
        controller: 'MyContentCtrl',
        template: '<button type="button" ng-click="addSection(elements)" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Add new section </button>',
        link: function($scope, element, attrs) {

        }
      };
    }
  ]);
'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('addresource', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'MyContentCtrl',
        template: '<p class="greyFontXSm verticalLine" ng-click="showSubmitFunc()"><span class="glyphicon glyphicon-plus"></span> Add New Resource </p>',
        link: function($scope, element, attrs) {

        }
      };
    }
  ]);
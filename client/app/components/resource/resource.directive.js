'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */


angular.module('corsaneApp')
  .directive('resource', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        scope: {
          element: '=',
          elements: '=',
          index: '=',
          poster: '='
        },
        controller: 'ResourceCtrl',
        templateUrl: 'components/resource/resourceinfo.html',
        link: function($scope, element, attrs) {
          $scope.element.url = $sce.trustAsResourceUrl(String($scope.element.url));
          
        }
      };
    }
  ]);
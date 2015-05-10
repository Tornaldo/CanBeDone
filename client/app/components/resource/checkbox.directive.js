'use strict';

angular.module('corsaneApp')
  .directive('csCheckbox', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        scope: {
          element: '='
        },
        template: '',
        link: function($scope, element, attrs) {
          
        }
      };
    }
  ]);
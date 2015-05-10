'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('addtopic', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        scope: {
          topic: '='
        },
        controller: 'MyContentCtrl',
        templateUrl: 'commons/addons/addtopic/addtopic.html',
        link: function($scope, element, attrs) {

        }
      };
    }
  ]);
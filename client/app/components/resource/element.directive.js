'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('element', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
          restrict: 'E',
          scope: {
            index: '=',
          },
          templateUrl: 'components/resource/element.html',
          transclude: true,
          controller: 'MyContentCtrl',

        };
    }
  ]);


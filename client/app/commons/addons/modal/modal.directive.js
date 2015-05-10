'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('modal', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
          restrict: 'E',
          scope: {
            name: '=',
            title: '=',
            modid:  '=',
            style: '=',
            span: '='
          },
          templateUrl: 'commons/addons/modal/modal.html',
          transclude: true,
          controller: 'topicbarCtrl',

        };
    }
  ]);


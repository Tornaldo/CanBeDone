'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('browse', ['$log','$sce',
    function($log, $sce) {
      return {
          restrict: 'E',
          scope: {
            element: '=',
          },
          templateUrl: 'commons/addons/collections/collections.html',
          controller: 'HomeCtrl'

        };
    }
  ]);
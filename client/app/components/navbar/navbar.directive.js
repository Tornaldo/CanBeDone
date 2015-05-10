'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('navbar', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'NavbarCtrl',
        templateUrl: 'components/navbar/navbar.html',
        link: function($scope, element, attrs) {
          
        }
      };
    }
  ]);
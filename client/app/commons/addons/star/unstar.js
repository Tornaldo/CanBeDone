'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('unstar', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'MyContentCtrl',
        templateUrl: '<p type="button" class="greyFontMd" ng-click="unstarTopic(topic.topicId); starred.value = !starred.value"><span class="glyphicon glyphicon-star-empty"></span> Unstar</p>',
        link: function($scope, element, attrs) {

        }
      };
    }
  ]);
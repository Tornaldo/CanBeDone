'use strict';

/**
 * Directive for displaying resources
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
  .directive('star', ['$log','$sce', 'listService',
    function($log, $sce, listService) {
      return {
        restrict: 'E',
        controller: 'MyContentCtrl',
        template: '<p type="button" class="greyFontMd" ng-click="starTopic(topic.topicId); starred.value = !starred.value"><span class="glyphicon glyphicon-star"></span> Star it!</p>',
        link: function($scope, element, attrs) {

        }
      };
    }
  ]);
'use strict';
//TODO: Access element inside using transclude, for maximum reusablitiy
angular.module('cbdIdea')
.directive('editField', [ function() {
  return {
    restrict: 'AE',

    scope: {
      content: '=',
      onEdit: '&',
      template: '@'
    },

    template: '<div ng-include="selectedTemplate"></div>',
    controller: ['$scope', function($scope) {
      $scope.editorOn = false;
      $scope.contentCopy = $scope.content;

       $scope.save = function() {
        console.log("SAVE");
        $scope.editorOn = false;
        $scope.onEdit();
      }

      $scope.cancel = function() {
        $scope.editorOn = false;
        $scope.content = $scope.contentCopy;
      };
    }],

    link: function(scope, elem, attrs) {
      console.log("TYPE:" + scope.template);
      if(scope.template == 'title') {
        scope.selectedTemplate = 'src/ideaProfile/editField/edit-title.tpl.html';
      }
      else if(scope.template == 'text') {
        scope.selectedTemplate = 'src/ideaProfile/editField/edit-text.tpl.html';

      }
      else {
        scope.selectedTemplate = 'src/ideaProfile/editField/edit-field.tpl.html';
      }
    }
  };
}]);

angular.module('cbdIdea')
.directive('relatedIdeas', [ function() {
  return {
    restrict: 'AE',

    scope: {
      content: '='
    },

    templateUrl: 'src/ideaProfile/relatedIdeas/related.tpl.html',
    controller: ['$scope', function($scope) {
      $scope.redirectTo = function() {
        //TODO: redirect;
      }
    }],

    link: function(scope, elem, attrs) {
      
    }
  };
}]);

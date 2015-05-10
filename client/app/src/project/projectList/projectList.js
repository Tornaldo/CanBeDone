angular.module('cbdProject')
.directive('projectList', [ function() {
  return {
    restrict: 'AE',

    scope: {
      elements: '='
    },

  templateUrl: 'src/project/projectList/project-list.tpl.html',

  controller: ['$scope',function($scope) {

  }],

  link: function(scope, elem, attrs) {
  }
};
}]);
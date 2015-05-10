angular.module('cbdProject')
.directive('projectCreate', [ function() {
  return {
    restrict: 'AE',

    scope: {
      nrProject: '=',
      idea: '='
    },

  templateUrl: 'src/project/createPanel/create-panel.tpl.html',

  controller: ['$scope',function($scope) {

  }],

  link: function(scope, elem, attrs) {
  }
};
}]);
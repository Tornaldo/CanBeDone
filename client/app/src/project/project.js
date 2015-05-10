angular.module('cbdProject', ['cbdCommon', 'cbdIdeaConstruction'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/idea/:ideaId/create-project', {
        templateUrl: 'src/project/projectForm/project-form-page.tpl.html',
        controller: 'ProjectFormPageCtrl',
        resolve: {
          ideaId: ['$route', function($route) {
            var ideaParam = $route.current.params.ideaId;
            return ideaParam;
          }]
      }
      })
  }])
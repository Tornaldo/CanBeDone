'use strict';

angular.module('cbdFront', ['cbdCommon'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/front/front.tpl.html',
        controller: 'FrontCtrl',
        resolve: {
          popularIdeas: ['ideaService', function(ideaService) {
            return ideaService.getPopularIdeas('all').then(function (response) {
                    return response;
                });
          }]
        }
      })
  }])


  .controller('FrontCtrl', 
    ['$scope', '$routeParams', '$location', 'ideaService', 'popularIdeas', 
    function ($scope,$routeParams, $location, ideaService, popularIdeas) {

    $scope.popularIdeas = popularIdeas.ideas;
    $scope.totalItems = popularIdeas.totalItems;

    $scope.redirectToAddIdea = function() {
        $location.path('/addIdea');
    };

    $scope.redirectToBrowse = function(query) {
        $location.path('/browse').search({'search': query});
    };

    $scope.getPopularIdeas = function(category) {
       ideaService.getPopularIdeas(category)
           .then(function (ideas) {
               $scope.popularIdeas = ideas;
           }, function(error) {
              $scope.status = 'unable to load ideas data' + error.message;
           });
            
    };

}]);


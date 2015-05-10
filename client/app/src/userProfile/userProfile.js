angular.module('cbdUserProfile', ['cbdCommon'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/userprofile', {
        templateUrl: 'src/userProfile/user-profile.tpl.html',
        controller: 'userProfileCtrl'
      })
  }])

.controller('userProfileCtrl', ['$scope', function ($scope) {


}])
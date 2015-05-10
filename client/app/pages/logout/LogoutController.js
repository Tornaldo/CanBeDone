'use strict';

var myApp = angular.module('corsaneApp');

myApp.controller('LogoutController', ['$scope', '$rootScope', '$cookieStore', '$state','authService', function($scope, $rootScope, $cookieStore, $state, authService) {

    $rootScope.user = {};
    $rootScope.oauth = {};
    $rootScope.isLoggedIn = false;
    $cookieStore.remove('oauth');

    console.log('LogoutController');
    $state.go('home');
}]);


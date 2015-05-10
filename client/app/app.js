'use strict';

/**
 * @ngdoc overview
 * @name canBeDoneApp
 * @description
 * # canBeDoneApp
 *
 * Main module of the application.
 */
  angular
  .module('canBeDoneApp', [
    //'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput',
    'summernote',
    'cbdConfig',
    'cbdFront',
    'cbdCommon',
    'cbdBrowse',
    'cbdIdea',
    'cbdIdeaConstruction',
    'cbdFaq',
    'cbdProject',
    'cbdLogin',
    'cbdUserProfile'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }]);



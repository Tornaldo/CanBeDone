angular.module('cbdLogin', ['cbdCommon','ngSanitize'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'src/login/login.tpl.html',
        controller: 'loginCtrl'
      })
  }])

.controller('loginCtrl', ['$scope','ideaService',
function ($scope,ideaService, $location, AuthenticationService) {

  $scope.credentials = { email: "", password: "" };

	$scope.getCssClasses = function(ngModelContoller) {
		return {
				error: ngModelContoller.$invalid && ngModelContoller.$dirty,
				success: ngModelContoller.$valid && ngModelContoller.$dirty
		};
	};

	$scope.showError = function(ngModelController, error) {
   	 	return ngModelController.$error[error];
	};

	$scope.canSave = function() {
		return $scope.userInfoForm.$dirty && $scope.userInfoForm.$valid;
	};
	

  $scope.login = function() {
    //ideaService.login($scope.credentials).success(function() {
    ideaService.login($scope.credentials).then(function (data) {
      console.log('data: '+ data);
      $location.path('/');
    });
  };

}])

.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
})

.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

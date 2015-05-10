
angular.module('cbdCommon', ['ui.bootstrap'])
	.controller('headerCtrl', function($scope, $location) {

	    $scope.sidebar = false;

	    $scope.toggeSidebar = function() {
	        $scope.sidebar = !$scope.sidebar;
	    }
	    $scope.isActive = function (viewLocation) {
	        return viewLocation === $location.path();
	    };

	    $scope.searchForIdeasNav = function(searchnav) { 
			 $location.path('/browse').search({search: searchnav});
	    };


	});








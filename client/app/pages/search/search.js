'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('SearchCtrl', ['$scope', '$log', 'resourceService', 'global','$sce',
		function($scope, $log, resourceService, global, $sce) {
			

			$scope.showSubmit = global.showSubmit();

			$scope.showSubmitFunc = function() {
				$scope.showSubmit.value = true;
				global.showSubmit(true);
			}


		}
	]);
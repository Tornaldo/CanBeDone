'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('ModalCtrl', ['$scope', '$log', 'listService', 'global', '$filter', '$location', '$state', '$stateParams', '$sce', 'topicService', '$modal',
			function($scope, $log, listService, global, $filter, $location, $state, $stateParams, $sce, topicService, $modal) {


				// $scope.items = ['item1', 'item2', 'item3'];
				// $scope.open = function(size) {
				// 	$log.info('Modal working');
				// 	var modalInstance = $modal.open({
				// 		templateUrl: 'modal.html',
				// 		controller: 'ModalInstanceCtrl',
				// 		size: size,
				// 		resolve: {
				// 			items: function() {
				// 				return $scope.items;
				// 			}
				// 		}
				// 	});

				// 	modalInstance.result.then(function(selectedItem) {
				// 		$scope.selected = selectedItem;
				// 	}, function() {
				// 		$log.info('Modal dismissed at: ' + new Date());
				// 	});
				// };
	}
]);
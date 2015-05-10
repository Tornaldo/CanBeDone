'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('ModalInstanceCtrl', ['$scope', '$log', 'listService', 'global', '$filter', '$location', '$state', '$stateParams', '$sce', 'topicService', '$modal','$modalInstance',
			function($scope, $log, listService, global, $filter, $location, $state, $stateParams, $sce, topicService, $modalInstance) {

				$scope.items = items;
				$scope.selected = {
				  item: $scope.items[0]
				};

				$scope.ok = function () {
				  $modalInstance.close($scope.selected.item);
				};

				$scope.cancel = function () {
				  $modalInstance.dismiss('cancel');
				};
	}
]);
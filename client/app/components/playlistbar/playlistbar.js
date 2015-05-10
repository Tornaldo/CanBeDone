'use strict';
/**
 * Playlist controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('PlaylistbarCtrl', ['$scope', 'resourceService', '$log', 'listService', 'global', '$state', '$anchorScroll', '$location',
		function($scope, resourceService, $log, listService, global, $state, $anchorScroll, $location) {

			// Give sub section indention
			$scope.indentLevel = function(level) {
				return 'indent' + level;
			}

			// Function that gets called when a resource is clicked.

			$scope.showResource = function(item, idx) {

				// Handles opening and closing of sections
				if (item.list_element_type == 'list_section') {
					if (item.open) {
						var index = [];
						for (var x in $scope.listElements.elements) {

							if ($scope.listElements.elements[x].level > item.level) {
								index.push($scope.listElements.elements.indexOf($scope.listElements.elements[x]));
												
							};
						}
						$scope.listElements.elements.splice(index[0], index.length);	
						//$scope.listElements.elements.splice(idx + 1, item.elements.length);
						item.open = false;
					}
					else {
						for (var i in item.elements) {
							$scope.listElements.elements.splice(idx + 1, 0, item.elements[i]);
						}
						item.open = true;	
					}
				};

				// Scroll to the resource clicked
				$location.hash('element'+idx);
				$anchorScroll();
				$scope.idx.value = idx;

				// Highlight selected resource
				if (item) {
					global.setResource(item);

					$scope.isSelected = function(list) {
						return list === item ? 'selectedElement' : '';
					}	
				};
				// Give focus to selected resource. Currently not in use
				document.getElementById('listTable').focus();

			};

			// Redirects user to submit page
			$scope.toSubmit = function(playlist) {
				$state.go('submit');
				global.toPlaylist(true);
			}

			// Watches changes on a list and post new list order if positions is switched.
			var newList = "";
			$scope.$watch('listElements', function(newValue, oldValue) {
				if (newValue != oldValue && oldValue != undefined && newValue.elements != undefined) {
					for (var i = 0; i < newValue.elements.length; i++) {
						newList = newList + newValue.elements[i].list_element_id + ',';
					}
					newList = newList.slice(0, newList.length - 1);
					var playlist = global.setList();
					if (newList) {
						listService.moveListElements(playlist.value, newList);
						document.getElementById('listTable').focus();
					};

				};
				newList = "";

			}, true)

			$scope.idx = {
				value: ""
			}

			// Function to handle variuos key presses 
			$scope.keyPress = function(keyCode) {

				if (keyCode == 38 && $scope.idx.value != 0) {
					$scope.showResource($scope.listElements.elements[$scope.idx.value - 1], $scope.idx.value - 1);

				} else if (keyCode == 40 && $scope.listElements.elements.length - 1 != $scope.idx.value) {
					$scope.showResource($scope.listElements.elements[$scope.idx.value + 1], $scope.idx.value + 1);

				} else if (keyCode == 13 && $scope.listElements.elements[$scope.idx.value]) {
					window.open($scope.listElements.elements[$scope.idx.value].url);
				} else {
				}
			}
			
			// -------- Scrolling highlighting --------- \\

			

		}
	]);
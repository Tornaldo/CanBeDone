'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('MyPlaylistsCtrl', ['$scope', '$log', 'listService', 'global', '$filter', '$location', '$state','$stateParams','$sce',
		function($scope, $log, listService, global, $filter, $location, $state, $stateParams, $sce) {

			// If my playlist accordian is open
			$scope.open = false;
			
			// Set selected lits to thisList
			$scope.thisList = global.setList();
			// See if url passes in parameters and update and open correct list accordingly
			if ($state.$current == 'playlist') {
				var tmp = listService.getListById($stateParams.id);
				tmp.$promise.then(function(result){
					$scope.passPlaylist(result);
				})
				
			};

			$scope.showPlaylistForm = false;

			// This function gets run when a playlist is selected
			$scope.passPlaylist = function(playlist) {

				// Assigning playlist elements to listElements variable
				$scope.listElements = listService.getElements(playlist);
				$scope.listElements.$promise.then(function(data) {
				  for (var i in data.elements){
				    
				    if (data.elements[i].text) {
				      // Tells site to trust this html
				      data.elements[i].text.text = $sce.trustAsHtml(data.elements[i].text.text);
				    };
				  }
				  // Sort element by index in list
				  $scope.listElements.elements = $filter('orderBy')(data.elements, 'index_in_list');
				  $scope.listElements.numberOfElements = data.elements.length;

				})
				// Set clicked playlist as current playlist
				global.setList(playlist);
				
				// Tells ng-if in home.html to display playlist.html
				global.isPlaylist(true);

				// Passes parameter to url
				$state.go('playlist',{id: playlist.id});
				
			};

			// Function for adding new playlists
			$scope.createNewList = function(name) {
				listService.addList(name).then(function(result){
					$scope.passPlaylist(result);
				});
				$scope.showPlaylistForm = false;

			};

			$log.info('statep2' + $state.$current);
			// Highlights selected playlist
			$scope.isActiveList = function (listId) {
				
				if ($state.$current == 'playlist') {
			    	return listId == $stateParams.id;
				}; 
			};

			$scope.isActiveTopic = function (topicId) {
			    if ($state.$current == 'topic') {
			    	return topicId == $stateParams.id;
			    };
			};


			// Carries state of edit-mode
			$scope.isEditable = false;

			// Switches to or from edit-mode 
			$scope.editName = function(playlist, idx) {
				if ($scope.isEditable) {
					$scope.isEditable = false;
				} else {
					if (playlist.section_id) {
						$scope.isEditable = playlist.section_id;

					} else {
						$scope.isEditable = playlist.id;
					}

				}

			}

			// Sets the new name of the playlist
			$scope.setNewName = function(playlist, newName) {
				playlist.name = newName;
				listService.changeListName(playlist, newName);
				$scope.isEditable = false;

			}

			// Asks if user want to delete playlist
			$scope.deleteAlert = function(playlist, idx) {
				var yes = confirm('Do you want to delete this playlist? ' + idx);
				if (yes) {
					if (playlist.section_id) {
						listService.removeListElement(playlist, global.setList(), idx, $scope.listElements);
					} else {
						listService.removeList(playlist.id, idx);
					}
				}
			}




		}
	]);
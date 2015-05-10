'use strict';

/**
 * Resource controller
 *
 * @author Øyvind Hellenes
 */
 
angular.module('corsaneApp')
	.controller('ResourceCtrl', ['$scope', '$log', 'global', 'listService','$rootScope','ratingService','topicService','resourceService', '$stateParams','collectionService',
		function($scope, $log, global, listService, $rootScope, ratingService, topicService, resourceService, $stateParams, collectionService) {
			
			$scope.resource = global.setResource();

			$scope.clickedVideo = false;

			$scope.note = {
				edit: false
			}

			var elementHolder = {
				value: ""
			}

			// if ($scope.element.name.length > 28) {
			// 	$scope.element.name = $scope.element.name.substring(0, 26) + '...';
			// };

			// When clicked, this function adds the given resource to this playlist.
			$scope.addToCollection = function(collection, element) {
				collectionService.add_resource(collection, element);
			};

			$scope.getElement = function(element) {
				global.setResource(element);
			}

			// Indicate that user is finished editing note
			$scope.postNote = function(text, id){
				resourceService.note(text, id);
				$scope.note.edit = false;
			}

			// Set resource
			$scope.setResource = function(element){
				global.setResource(element);
			}
			
			$scope.voted = {
				value: false
			}
			$scope.votes = $scope.element.vote;

			// Temporary solution
			$scope.vote = function(id){
	
				resourceService.vote(1, id);
				$scope.voted.value = true;
				$scope.votes++;
			}

						// Gets called when a resource is removed from a list.
			$scope.removeResource = function(resource, idx, resources) {
				collectionService.remove_resource($stateParams.id, resource)
				idx = resources.length - idx - 1;

				$log.info('index' + idx);
				resources.splice(idx, 1);

			};

			// Asks if user want to delete playlist
			$scope.deleteAlert = function(playlist, idx, elements) {
				if (playlist.section_id) {
					listService.removeListElement(playlist, global.setList(), idx, elements);
				} else {
					listService.removeList(playlist.id, idx);
				}
			}

			// Carries state of edit-mode
			$scope.isEditable = false;
			//$scope.newName = "";

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

			$scope.openLink = function(url){
				window.open(url);
			}

			$scope.imageDim = function(element){
				$log.info('dim:' + element.embedly.images.height);
				return element.embedly.images.height > element.embedly.images.width;
			}
		}
	]);
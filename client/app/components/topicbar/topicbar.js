
'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('topicbarCtrl', ['$scope', '$log', 'listService', 'global', '$filter', '$location', '$state','$stateParams','$sce','topicService','resourceService','userService','$rootScope',
		function($scope, $log, listService, global, $filter, $location, $state, $stateParams, $sce, topicService, resourceService, userService, $rootScope) {




			//$scope.thisSearch = resourceService.searchTerm();


			$scope.openPlaylist = function(playlist){
				
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

			}



		}
	]);
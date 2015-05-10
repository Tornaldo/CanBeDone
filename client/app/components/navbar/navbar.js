'use strict';

/**
 * Navigation bar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('NavbarCtrl', ['$scope', 'global', '$location', 'resourceService', '$state','$log','listService','$filter','topicService','$rootScope','$sce','$q',
		function($scope, global, $location, resourceService, $state, $log, listService, $filter, topicService, $rootScope, $sce, $q) {
			

			// The function that is activated when a user searches
			$scope.search = function(term, topicId) {
				// Tells ng-if not to display playlist.html
				global.isPlaylist(false);

				// Variable for holding search result
				$scope.searchRes = global.setSearchRes();
				var q = $q.defer();
				// Passes search term to a service

				if(term){
					var tmp = resourceService.search(term, topicId);
					// This function makes sure text from a resource is trusted as html
					if (tmp) {
						tmp.$promise.then(function(data) {
							for (var i in data.resources){
								
								if (data.resources[i].text && typeof data.resources[i].text.text == 'string') {
									data.resources[i].text.text = $sce.trustAsHtml(data.resources[i].text.text);
								};
								
							}
							if (data.topicInfo) {
								$state.go('topic',{id: data.topicInfo.topicId});
								q.resolve(data.topicInfo);
							}
							else {
								$state.go('search',{id: term});
							};

							$scope.searchRes.value = data.resources;
							$scope.searchRes.lists = data.lists;
							$scope.searchRes.topic = data.topicInfo;
							global.setSearchRes($scope.searchRes.value);
							global.setTopic(data.topicInfo);
							

						})
					};
				}
				// Clears search input
				$scope.searchTerm = '';
				$scope.shortPath = '/none';

				return q.promise;
			};

			$scope.openAuto = function(){
				$scope.open = true;
			}

			// Redirects to homepage when logo i clicked
			$scope.goHome = function(ingenting) {
				$state.go('home');
			};

			$scope.goProfile = function(profileId) {
				$log.info('profileId' + profileId);
				$state.go('profile', {id: profileId});
			}

			$scope.shortPath = '/none';
			// Check which navbar button is active.  
			$scope.isActive = function (viewLocation) {
				
				if ($location.path().slice(0, 9) == viewLocation) {
					$scope.shortPath = $location.path().slice(0, 9);
				}; 
			    return viewLocation === $scope.shortPath;
			};

			var topicIndex = 0;
			// Highlights selected playlist
			$scope.isActiveTopic = function (index) {
			    return index == topicIndex;
			
			};

			// Function to handle variuos key presses 
			$scope.switchTopic = function(keyCode) {

				if (keyCode == 38) {
					topicIndex = topicIndex + -1;

				} else if (keyCode == 40) {
					topicIndex = topicIndex + 1;
				}
				else if (keyCode == 13 || keyCode == 0) {
					if ($scope.autoResult.length > 0) {
						$scope.search($scope.autoResult[topicIndex].name);
					} 
					else {
						$scope.search($scope.searchTerm);
					}
					$scope.autoResult = "";
					
				}

			}

			$scope.autoResult = "";
			$scope.auto = "";

			$scope.newInput = function(input){
				$scope.autoResult = topicService.autocomplete(input);
			}

			// filter for searches
			$scope.searchType = {
				type: ""
			}

			

		}
	]);
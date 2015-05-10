'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */
 
angular.module('corsaneApp')
	.controller('HomeCtrl', ['$scope', 'global', 'listService', '$log','$location','collectionService','$rootScope','authService','$state','$cookieStore', '$q','resourceService','$sce',
		function($scope, global, listService, $log, $location, collectionService, $rootScope, authService, $state, $cookieStore, $q, resourceService, $sce) {
			
			// Variable for holding a resource. 
			$scope.setResource = global.setResource();

			// Variable for holding playlists

			$scope.topics = collectionService.getall();

			// Variable for holding a list and its content
			$scope.listElements = "";

			// Check if a playlist is selected
			$scope.isPlaylist = global.isPlaylist();

			$rootScope.user = {};

			// deprecate?
			// $rootScope.isAuthen = {
			// 	value: ""
			// };

			$scope.status = {
			  isFirstOpen: true,
			  isFirstDisabled: false
			};
			
			$rootScope.loading = {
				value: false
			}

			// --- Sidebarstuff

			$scope.toggleSidebar = function() {
			    $scope.toggle = !$scope.toggle;
			    $cookieStore.put('toggle', $scope.toggle);
			};

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

			$scope.goCollection = function(collectionId) {
				$state.go('topic', {id: collectionId});
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

			$scope.logout = function(){
				authService.logout();
				$rootScope.user = {};
				$rootScope.oauth = {};
				$rootScope.isLoggedIn = false;
				$cookieStore.remove('oauth');

				console.log('LogoutController');
				$state.go('home');
			}

		}
	]);
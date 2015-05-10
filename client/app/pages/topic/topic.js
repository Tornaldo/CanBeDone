'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('TopicCtrl', ['$scope', '$log', 'topicService', 'global','$sce','$stateParams','$state','$rootScope','userService', 'collectionService',
		function($scope, $log, topicService, global, $sce, $stateParams, $state, $rootScope, userService, collectionService) {

			$scope.showDescription = false;
			$scope.showPlaylists = false;
			$scope.showSubtopics = false;
			$scope.showImageForm = false;
			$scope.showDescForm = false;

			$scope.my_data = [{
			  label: ' ',
			  children: ""
			}]
			$scope.result = "";
			

			if ($state.$current == 'topic') {

				$scope.result = collectionService.get($stateParams.id);
				
				// $scope.search($stateParams.id, 'true').then(function(result){
					
				// 	if (result.subTopics !== undefined) {
				// 		$scope.result = result.subTopics.elements;
				// 		for (var i in result.subTopics.elements) {
							
				// 			if (result.subTopics.elements[i] !== undefined) {
				// 				$scope.my_data[0].children[i] = result.subTopics.elements[i].name;
				// 			};
				// 		}

				// 		$scope.my_data[0].label = result.name;
					
				// 	};
			
				// })

			};

			$scope.goToCollection = function(branch){
				for (var i in $scope.result){
					if ($scope.result[i].name == branch.label) {
						$state.go('topic', {id: $scope.result[i].topicId});
					};
				}

			}

			$scope.addPlaylist = function(topic, list, lists){
				
				if (list && topic.topicId) {
					topicService.addPlaylist(topic.topicId, list, lists);
				};
			}

			$scope.addImage = function(image, collection){

				collectionService.image(image.url, collection.id).then(function(result){
					$scope.result.image_url = result.image_url;
				})
				$scope.showImageForm = false;

				
			}

			$scope.addDesc = function(desc, collectionId){

				collectionService.description(desc, collectionId)
				$scope.showDescForm = false;
				
			}


			$scope.starTopic = function(collection){
				collectionService.star(collection);
			}
			$scope.unstarTopic = function(id){
				collectionService.unstar(id);
			}

			$scope.starred = {
				value: true
			}
			if ($rootScope.user.collections) {
				for (var i in $rootScope.user.collections){
					if ($stateParams.id == $rootScope.user.collections[i].id) {
						$scope.starred.value = false;
					}

				}
				
			};

		}
	]);
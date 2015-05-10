'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('MyContentCtrl', ['$scope', '$log', 'listService', 'global', '$filter', '$location', '$state','$stateParams','$sce','topicService','$q','$rootScope','userService','$modal','collectionService',
		function($scope, $log, listService, global, $filter, $location, $state, $stateParams, $sce, topicService, $q, $rootScope, userService, $modal, collectionService) {

			$scope.showSubmit = global.showSubmit();
			$scope.showTopicForm = false;

			$scope.showDiv = {
				value: false,
				index: ""
			}

			$scope.showSubmitFunc = function() {
				$scope.showSubmit.value = true;
				global.showSubmit(true);
			}

			// Add new section to a playlist
			$scope.addSection = function(elements) {

				listService.addListSection(global.setList(), elements);

			}

			$scope.isHover = function(idx){

				if ($scope.showDiv.index == idx) {
					$scope.showDiv.value = true;
				};
			}

			$scope.saveOrder = function(list){
				
				var order = "";
				for (var i in list) {
					order = order + list[i].id + ',';
				}
				order = order.substring(0, order.length - 1);
				listService.moveListElements(list, order);
				order = "";

				// 5,8,9,10

				// 8,9,5,10
			}

			// Add new topic
			$scope.topicName = $scope.thisSearch;

			$scope.topicDescription = " ";
			$scope.subTopicsArray = "";
			

			$scope.createNewTopic = function(topic, name) {

				if (!topic) {

					$scope.loading.value = true;	
					collectionService.create($scope.topicName, $scope.topicDescription).then(function(result){
						$scope.search(result, true);
						$scope.loading.value = false;
					})
				}
				else if (name){

					for (var i in topic.subtopics.elements){
						$scope.subTopicsArray = $scope.subTopicsArray + topic.subTopics.elements[i].topicId + ",";
					}
					
					//$scope.loading.value = true;	
					topicService.post(name, $scope.topicDescription).then(function(result){
						//$scope.search(result, true);
						//$scope.loading.value = false;
						$scope.subTopicsArray = $scope.subTopicsArray + result;
						topicService.addSubTopic(topic.topicId, $scope.subTopicsArray);
					})
				}
				else {
					alert('Enter valid input');
				}

				$scope.topicName = "";
				$scope.topicDescription = " ";
				$scope.showTopicForm = false;
				
			};

			$scope.starList = function(id){
				userService.star(id, 'list');
			}
			$scope.unstarList = function(id){
				userService.unstar(id, 'list');
			}

			$scope.starredList = {
				value: true
			}

            if (userService.isLoggedIn()) {
                for (var i in $rootScope.user.lists){
                    if ($stateParams.id == $rootScope.user.lists[i].id) {
                        $scope.starredList.value = false;
                    }
                }
            }

            $scope.addSubtitle = function(name){
            	listService.addListSection($scope.listElements, name);
            	$scope.showSubtitleForm = false;
            }

            $scope.isAllowedToCreateNewTopic = function(){
            	if ($rootScope.user.id) {
            		$scope.showTopicForm = true;
            	}
            	else {

            		$state.go('login');
            	}
            }

            // -- - - - - 

            $scope.createCollection = function(parentCollection, name){
            	if (!parentCollection) {
            		collectionService.create(name).then(function(data){
            			collectionService.star(data);
            		})
            	}
            	else {
            		collectionService.create(name).then(function(data){
            			collectionService.add_subcollection(parentCollection, data);
            		})
            	}
            	$scope.showTopicForm = false;
            	name = " ";
            }
			
		}
	]);

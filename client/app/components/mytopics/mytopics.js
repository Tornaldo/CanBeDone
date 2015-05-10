'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes
 */

angular.module('corsaneApp')
	.controller('MyTopicsCtrl', ['$scope', '$log', 'listService', 'global', '$filter', '$location', '$state','$stateParams','$sce','topicService',
		function($scope, $log, listService, global, $filter, $location, $state, $stateParams, $sce, topicService) {


			$scope.topicElements = null;
			$scope.passTopic = function(topic) {

				global.setTopic(topic);

				var tmp = topicService.getTopicElements(topic.id)
				tmp.$promise.then(function(data){
					$scope.topicElements = data.resources;
				})
				
				// Passes parameter to url
				$state.go('topic.id',{id: topic.id});
			};

			// Highlights selected playlist
			$scope.isActiveTopic = function (topicId) {
				var pathId = $location.path(); 
			    return topicId == pathId.slice(pathId.length-1);
			};




		}
	]);
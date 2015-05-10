'use strict';

/**
 * Playlistbar controller
 *
 * @author Øyvind Hellenes, Jan Gulla
 */

angular.module('corsaneApp')
	.controller('SubmitCtrl', ['$scope', 'resourceService', 'global','$upload','config','fileService','$log','topicService','listService','$rootScope', 'collectionService','$stateParams',
		function($scope, resourceService, global, $upload, config, fileService, $log, topicService, listService, $rootScope, collectionService, $stateParams) {

			// Checks wether to submit directly to a list or not
			$scope.toPlaylist = global.toPlaylist();
			$scope.thisList = global.setList();
			$scope.showSubmit = global.showSubmit();

			$scope.closeSubmit = function(){
				$scope.showSubmit.value = false;
				global.showSubmit(false);
			}

			// Resource object to hold resource info
			$scope.resource = {
				description: "",
				url: "",
				type: "url",
				text: "",
				file: "",
				title: ""
			}

			// Don't know what this is
			$scope.status = {
				isFirstOpen: true,
				isFirstDisabled: false
			};

			// Summernote config
			$scope.options = {
				height: 300,
				focus: true,
				toolbar: [
					['style', ['bold', 'italic']],
					['fontsize', ['fontsize']],
					['para', ['ul', 'ol', 'paragraph']],
					['misc', ['fullscreen']],

				]
			};

			// Submits a resource when button is clicked
			$scope.submit = function(resource, result) {

				$rootScope.loading.value = true;
				resourceService.post(resource.url, result).then(function(data){
					var newdata = resourceService.get(data.id);
					
					result.resources.push(newdata);
				})
			
				$scope.resource = {
					description: "",
					url: ""
				}

				$scope.showSubmit.value = false;
			};

			$scope.tab = 'url';
			// Switch between tabs in submit view
			$scope.setTab = function(tab) {
				$scope.resource.type = tab;
				$scope.tab = tab;
			};
			
			$scope.tabIsSelected = function(tab) {
				return $scope.tab === tab;
			};

			// ::::::::::::::::::::::::::: Upload :::::::::::::::::::::::::::::
			// For testing picture uploading
			$scope.showPic = function(){
				$scope.picture = fileService.get(1);
			}

			// Temporary submit for files
			$scope.submitFile = function() {

				fileService.post($scope.resource.file);

			};

		}
	]);
angular.module('cbdProject')
.controller('ProjectFormPageCtrl', ['$scope', 'ideaId',
function ($scope, ideaId) {
    $scope.idea = {};
    $scope.idea.id = parseInt(ideaId);
}])

.controller('ProjectFormCtrl', ['$scope', 'projectService', 'notification', '$location', 'categoryService',
function ($scope, projectService, notification, $location, categoryService) {
    $scope.project = {};
    $scope.project.skillIds = [];
    $scope.ideaId = $scope.$parent.idea.id;
    
    $scope.submitProject = function() {
    	$scope.project.ideaId = $scope.ideaId;
        projectService.submitProject($scope.project)
        .then(function(success) {
            notification.success("Project posted");
            $location.path('/idea/' + $scope.ideaId  + '/');
        }, function(error) {
            console.log(error);
        });
    };

     $scope.getMainSkills = function() {
        return categoryService.getMainSkills()
    };

    $scope.getSkillSubcategory = function(cid) {
        return categoryService.getSkillSubcategory(cid);
    };
}])
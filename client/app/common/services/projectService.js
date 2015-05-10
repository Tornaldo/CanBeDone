angular.module('cbdCommon').
factory('projectService', ['baseService', 'config',
function (baseService, config) {

    return {
        submitProject: function(project) {
        project.skillIds = project.skillIds.toString();
        var url = config.apiBaseUrl + 'projects';
        return baseService.postResource(url, project);
        },
    };

}]);
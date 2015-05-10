
angular.module('cbdIdeaConstruction').directive('securityOption', [ function() {
    return {
        restrict: 'AE',
        scope: {
        	model: "=",
            description: "@",
            title: "@"

        },
        template: '<div class="panel">'+
        '<div class="panel-body">'+
        '<div style="float:left width:40px"><input type="checkbox" ng-model="model"></div>'+
        '<div style="float:right"><h4>{{title}}</h4>{{description}}</div></div>' +
        '</div>',
        link: function(scope, element, attrs) {

        }
    };
}
]);

angular.module('cbdIdeaConstruction').directive('securityPanel', [ function() {
    return {
        restrict: 'AE',
        scope: {
            model: '='
        },
        templateUrl: 'src/ideaConstruction/securitySettings/accessControlForm.tpl.html',
        link: function(scope, element, attrs) {
            scope.isRestrictedSelected = false;
             scope.securityOptions = [
                {name: "googlable", description: "Should the idea be indexed at google", title: "Googlable"},
                {name: "openAllUsers", description: "The idea will only be showcased to", title: "Open to all users"},
                {name: "nonPosterProjectsAllowed", description: "Only you can create a project based on this idea", title:"Project created by others allowed"},
                {name: "competenceRestrictionExists", description: "Some compentence restriction exists???", title:"Compentence restriction for projecteers"},
                {name: "approvalRestrictionExists", description: "Potensial projecteers must apply for approval", title:"Project approval from idea owner"},
                {name: "geographyRestrictionExists", description: "Restrict idea to a geographical area", title:"Geography restriction"}
                ];

            scope.showOptionsForRestricted = function(show) {
                scope.isRestrictedSelected = show;
                if(show == false) {
                    angular.forEach(scope.securityOptions, function(option) {
                        if(angular.isDefined(scope.model[option.name])) {
                            delete scope.model[option.name];
                        }
                    })
                }
            };
        }
    };
}
]);
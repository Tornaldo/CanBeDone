
angular.module('cbdFaq' )
.controller('FaqFormCtrl', ['$scope', 'ideaService', 'notification', '$location',
function ($scope, ideaService, notification, $location) {
    $scope.faq = [{question: "", answer: ""}];
    $scope.ideaId = $scope.$parent.idea.id;
    //TODO: Make template and controller into a directive.
    
    $scope.submitFaq = function() {
        ideaService.postFaq($scope.ideaId, $scope.faq)
        .then(function(success) {
            notification.success("FAQ posted");
            $location.path('/idea/' + $scope.ideaId  + '/');
            if($scope.$parent.faq) {
                $scope.$parent.faq.push.apply($scope.$parent.faq, $scope.faq)
            }
            $scope.faq = [{question: "", answer: ""}];
        }, function(error) {
            console.log(error);
        });
    };

    $scope.addQuestionAnswer = function() {
        $scope.faq.push({question: "", answer: ""});
    }

    $scope.removeQuestionAnswer = function(idx) {
        $scope.faq.splice(idx, 1);
    }
}])

.controller('FaqFormPageCtrl', ['$scope', 'ideaId', 'notification',
function ($scope, ideaId, notification) {
    $scope.idea = {};
    $scope.idea.id = ideaId;
}])
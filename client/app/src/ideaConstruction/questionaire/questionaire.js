
angular.module('cbdIdeaConstruction')
.controller('questionaireCtrl', ['$scope',
function ($scope) {
    //$scope.idea.purpose = {};
    $scope.purposeQuestionaire = [
        {
          question: "Why are you posting this idea?", 
          type: "checkbox",
          name: "whyPost",
          alternatives: [{name: "postingToFindPeople", value: "To find people who can help me implement it"},
           {name:"postingToGetFeedback ", value: "To get feedback"},
           {name :"postingToSeeIfOthersAreInterested", value: "To see if others are interested in working on this idea"},
           {name :"postingToInspireOthers", value: "To share it with the world in the hope that someone else makes something out of it"}
           ]},
        {
          question: "Would you be ok with somebody else taking this idea and implementing it independently of you?", 
          name: "independentImplementation",
          type: "radio",
          alternatives: [{name:"yes", value: "Yes"},
            {name:"no",value: "No"},
            {name: "talkToMe", value: "They would have to talk with me about it"}]
        }
    ];

}])
/**
 * @ngdoc directive
 * @name cbdIdeaConstruction.directive:question
 * @param  {object} answer Where the user selection is stored
 * @param  {object} text the question text
 * @param  {object} alternatives all possible alternatives for a question. Should be put in a list where all
 * alternatives has a name and value attribute. name will be used when posting the answer to the backend and 
 * the value containt text that are human readable.
 * @description
 * Directive contain logic and gui representation of 1 question and its alternatives.
 * Two modes of operations are supported: multiple and single selection. These are represented
 * by using either checkboxes or radioboxes.
 */
.directive('questionSingle', [ function() {
  return {
    restrict: 'AE',

    scope: {
      answer: '=',
      text: '@',
      alternatives: '=',
      group: '@',
    },
    //Mode is whether one or several of the alternatives can be selected.
    template: '<ul class="list-unstyled questionaire-list"><h4>{{text}}</h4><li ng-repeat="alt in alternatives"><input type="radio" name="group" ng-model="answer[group]" ng-value="alt.name"> {{alt.value}}</li></ul>',
    controller: ['$scope', function($scope) {
        
      $scope.option_clicked = function(option) {
        console.log(option);
      };
    }],

    link: function(scope, elem, attrs) {
      
    }
  };
}])

.directive('questionMultiple', [ function() {
  return {
    restrict: 'AE',

    scope: {
      answer: '=',
      text: '@',
      alternatives: '=',
    },
    //Mode is whether one or several of the alternatives can be selected.
    template: '<ul class="list-unstyled questionaire-list"><h4>{{text}}</h4><li ng-repeat="alt in alternatives"><input type="checkbox" ng-model="answer[alt.name]" ng-change="option_clicked(alt)"> {{alt.value}}</li></ul>',
    controller: ['$scope', function($scope) {
        
      $scope.option_clicked = function(option) {
        console.log(option);
      };
    }],

    link: function(scope, elem, attrs) {
      if(scope.mode == 'radio') {
        scope.groupName = 'radioGroup'
      }
    }
  };
}]);
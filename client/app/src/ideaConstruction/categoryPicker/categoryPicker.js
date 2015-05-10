/**
 * @ngdoc directive
 * @name cbdIdeaConstruction.directive:categoryPicker
 * @restrict AE
 * @require categoryService
 * @param  {object} result Object containing list of user selected categories.
 * @description
 * Directive for dynamically retrieve and show sub categories to the user when
 * the user click a category. The directive will manage the hierarchy of categories.
 * For example if user remove a category, all displayed subcategories, and subcat of
 * subcategories has to be removed from result.
 *
 * TODO: Preload more than one sublevel of categories. To increase perceived
 * performance. IE preload the main categories and the first level of subcategories.
 *
 * TODO: Include a "more" link that retrieve more category options if available
 * at the backend 
 */
angular.module('cbdIdeaConstruction')
.directive('categoryPicker', [ function() {
  return {
    restrict: 'AE',

    scope: {
      result: '=',
      onMain: '&',
      onSubcategory: '&',
      key : "="
    },

    templateUrl: 'src/ideaConstruction/categoryPicker/category-picker.tpl.html',
    controller: ['$scope', function($scope) {
      $scope.main = [];
      $scope.sub = {};
      $scope.ordered = [];

      $scope.getMain = function() {
        var promise = $scope.onMain();
        promise.then(function(data) {
          console.log($scope.key);
          $scope.main = data[$scope.key];
        });

        $scope.getSubcategory = function(category, show) {
          if(show) {
            //If the user dont want the category hidden, retrive subcategories.
            var promise = $scope.onSubcategory({"cid": category.id});
            promise.then(function(data) {
              //Inclue the parent of the subcategories, and add them to the
              //datastructure
              var subCategory = {'parent': category.id, 'data': data};
              $scope.sub[category.id] = subCategory;
              $scope.ordered.push(subCategory);
              $scope.result.push(category.id);
            });
          }
          else {
            var queue = [];
            queue.push(category);
            while(queue.length > 0) {
              var cat = queue.shift();
              var sub = $scope.sub[cat.id];
              var subCatList = sub.data.category.subCategories;
              
              //For each sub category A of category check to see if 
              //There exist another sub category of A. If it exist
              //add to queue. This will ensure that removing a category will
              //propagate to all sub categories
              for(var i = 0; i < subCatList.length; i++) {
                if($scope.sub[subCatList[i].id]) {
                  queue.push(subCatList[i]);

                }
              }
              //Use list to keep order the same! Has to be found
              // and removed in order for GUI to be correct
              for (var j = 0; j<$scope.ordered.length; j++) {
                if($scope.ordered[j].data.category.id === cat.id) {
                    $scope.ordered.splice(j, 1);
                }
              }
              var index = $scope.result.indexOf(cat.id);
              $scope.result.splice(index, 1);
              $scope.sub[cat.id] = undefined;
            }
          }
          
        }
      }
    }],

    link: function(scope, elem, attrs) {
      scope.getMain();
    }
  };
}]);
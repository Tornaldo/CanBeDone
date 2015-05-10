'use strict';

/**
 * Directive for displaying youtube videos
 *
 * @author Øyvind Hellenes
 */
 
angular.module('corsaneApp')
  .directive('youtube', function() {
    return {
        restrict: 'E',
        scope: {
          movie: '@'
        },
        link: function(scope, element) {
            var object = '<object width="500" height="325">' +
              '<param name="movie" value="' + scope.movie + '" />' +
              '<param name="allowFullScreen" value="true" />' +
              '<param name="allowscriptaccess" value="always" />' +
              '<embed ' +
              '  src="' + scope.movie + '" ' +
              '  type="application/x-shockwave-flash" ' +
              '  allowfullscreen="true" ' +
              '  allowscriptaccess="always" ' +
              '  width="500" ' +
              '  height="325" />' +
            '</object>';
            element.replaceWith(object);
        }
    };
});
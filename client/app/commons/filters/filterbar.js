'use strict';

angular.module('corsaneApp')
	.filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	});
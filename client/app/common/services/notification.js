/**
*Toastr libary angular wrapper factory
*
**/
angular.module('cbdCommon')
.constant('toastr', toastr)
.factory('notification', ['toastr',
function (toastr) {
    toastr.options.closeButton = true;
    return {
        error: function(msg) {
            toastr.error(msg);
        },

        success: function(msg) {
            toastr.success(msg);
        },

        warning: function(msg) {
            toastr.warning(msg);
        },
    };
}]);
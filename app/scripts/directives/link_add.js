/**
 * Created by ma-li on 23.10.14.
 */


forgedditApp.directive('linkAddView', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/link_add_view.html',
        controller: 'addLinkController'
    };
});
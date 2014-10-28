/**
 * Created by ma-li on 23.10.14.
 */


forgedditApp.directive('linkListView', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/link_list_view.html',
        controller: 'LinkListCtrl'
    };
});
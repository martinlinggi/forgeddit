/**
 * Created by martinlinggi on 26.10.14.
 */

forgedditApp.directive('userListView', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/admin/user_list_view.html',
        controller: 'AdminUserListCtrl'
    };
});
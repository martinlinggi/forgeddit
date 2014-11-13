/**
 * @brief Angular-directive for the user-list
 *
 * @file admin_user_list.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('userListView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================
        return {
            restrict: 'E',
            templateUrl: 'templates/admin/user_list_view.html',
            controller: 'AdminUserListCtrl'
        };
    });

}());
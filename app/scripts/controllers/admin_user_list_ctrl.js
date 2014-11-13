/**
 * @brief Angular-controller for the user-list
 *
 * @file admin_user_list_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminUserListCtrl', ['$scope', 'UserDataService',
        function ($scope, UserDataService) {

            //=====================================================================
            // private functions
            //=====================================================================
            /**
             * @brief Gets all the users from the UserDataService
             */
            function getUsers() {
                UserDataService.getUsers()
                    .then(function (res) {
                        $scope.users = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });

            }

            //=====================================================================
            // Controller API
            //=====================================================================
            getUsers();
        }]);
}());
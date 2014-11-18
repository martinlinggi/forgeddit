/**
 * @brief Angular-controller for adding a new user
 *
 * @file admin_new_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminNewUserCtrl', ['$scope', '$location', 'UserDataService', 'UserService',
        function ($scope, $location, UserDataService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function goToAdminListView() {
                $location.path('/admin/users');
            }

            function submitAction() {
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                UserDataService.addUser(user)
                    .then(function () {
                        goToAdminListView();
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function cancelAction() {
                goToAdminListView();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.isEditMode = false;

            $scope.submitBtnLabel = 'Save';

            $scope.submitAction = submitAction;
            $scope.cancelAction = cancelAction;

        }]);
}());


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

            function goBack() {
                if ($location.path().indexOf('/admin/users') === 0) {
                    $location.path('/admin/users');
                } else {
                    if ($location.path().indexOf('/user/create') === 0) {
                        $location.path('/login');
                    }
                    else {
                        $location.path('/');
                    }
                }
            }

            function submitAction() {
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                UserDataService.addUser(user)
                    .then(function () {
                        goBack();
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function cancelAction() {
                goBack();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.user.blocked = false;
            $scope.isEditMode = false;

            $scope.submitBtnLabel = 'Save';

            $scope.submitAction = submitAction;
            $scope.cancelAction = cancelAction;

        }]);
}());


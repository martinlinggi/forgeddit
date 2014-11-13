/**
 * @brief Angular-controller for adding a new user
 *
 * @file admin_new_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminNewUserCtrl', ['$scope', '$location', 'UserDataService', function ($scope, $location, UserDataService) {

        //=====================================================================
        // private functions
        //=====================================================================
        function goToAdminListView() {
            $location.path('/admin/users');
        }

        function checkUser() {
            UserDataService.getUser($scope.user.name).then(function (res) {
//            console.log('check name', res.data);
                $scope.isUniqueUserName = res.data;
            }, function () {
                $scope.isUniqueUserName = true;
            });
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
        $scope.isUniqueUserName = true;
        $scope.isEditMode = false;

        $scope.submitBtnLabel = 'Save';

        $scope.checkUser = checkUser;
        $scope.submitAction = submitAction;
        $scope.cancelAction = cancelAction;

    }]);
}());


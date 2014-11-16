/**
 * @brief Angular-controller for editing an existing user
 *
 * @file admin_edit_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminEditUserCtrl', ['$scope', '$routeParams', '$location', 'UserDataService',
        function ($scope, $routeParams, $location, UserDataService) {


            //=====================================================================
            // private functions
            //=====================================================================
            function goToAdminListView() {
                $location.path('/admin/users');
            }

            function getUsers() {
                var userName = $routeParams.username;
                UserDataService.getUser(userName)
                    .then(function (res) {
                        $scope.user = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function submitAction() {
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                console.log('Update ', user.name);
                UserDataService.updateUser(user.Name, user)
                    .then(function () {
                        console.log('  ok.');
                        goToAdminListView();
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function cancelAction(){
                goToAdminListView();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.isEditMode = true;
            $scope.submitBtnLabel = 'Save';

            $scope.submitAction = submitAction;
            $scope.cancelAction = cancelAction;

            getUsers();

        }]);
}());
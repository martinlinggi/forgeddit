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
            function goBack() {
                if ($location.path().indexOf('/admin/users') === 0) {
                    $location.path('/admin/users');
                } else {
                    $location.path('/');
                }
            }

            function getUser() {
                var userName = $routeParams.username;
                UserDataService.getUser(userName)
                    .then(function (res) {
                        $scope.user = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function submitAction() {
                $scope.userNameError = false;
                $scope.message = '';
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                if (user.password === '') {
                    delete user.password;
                }
                console.log('Update ', user.name);
                UserDataService.updateUser(user.name, user)
                    .success(function () {
                        goBack();
                    })
                    .error(function(status, data) {
                        $scope.userNameError = true;
                        $scope.message = status;
                    });
            }

            function cancelAction(){
                goBack();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.user.blocked = false;
            $scope.isEditMode = true;
            $scope.submitBtnLabel = 'Save';

            console.log('url: ' + $location.path());

            $scope.submitAction = submitAction;
            $scope.cancelAction = cancelAction;

            getUser();

        }]);
}());
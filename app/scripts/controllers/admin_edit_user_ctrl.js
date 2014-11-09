/**
 * @brief This controller is used to edit an existing user
 *
 * Created by martinlinggi on 31.10.14.
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminEditUserCtrl', ['$scope', '$routeParams', '$location', 'UserDataService',
        function ($scope, $routeParams, $location, UserDataService) {
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.isEditMode = true;

            $scope.submitBtnLabel = 'Save';

            var userName = $routeParams.username;

            UserDataService.getUser(userName)
                .then(function (res) {
                    $scope.user = res.data;
                }, function (error) {
                    console.log('An error occured!', error);
                });

            $scope.submitAction = function () {
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                console.log('Update ', user.name);
                UserDataService.updateUser(userName, user)
                    .then(function () {
                        console.log('  ok.');
                        goToAdminListView();
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            };

            $scope.cancelAction = function () {
                goToAdminListView();
            };

            var goToAdminListView = function () {
                $location.path('/admin/users');
            };
        }]);
}());
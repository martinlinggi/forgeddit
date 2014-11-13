/**
* @brief Angular-controller for editing an existing user
*
* @file admin_edit_user_ctrl.js
* @author martin linggi
*/


(function() {
    'use strict';


    angular.module('forgedditApp').controller('AppCtrl', ['$scope', '$location', 'AuthTokenService', 'UserService',
        function ($scope, $location, AuthTokenService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function getUser() {
                UserService.getUser().then(function(response) {
                    console.dir(response.data);
                    $scope.isLogged = true;
                    $scope.username = response.data.username;
                    $scope.isAdmin = response.data.role === 'Administrator';
                });
            }

            function login(username, password){
                if (username !== undefined && password !== undefined) {

                    UserService.login(username, password).then(function (response) {
                        getUser();
                        $location.path('/');
                        $scope.login.email = '';
                        $scope.login.password = '';
                    }, function () {
                    });
                }
            }

            function logout() {
                UserService.logout();
                $scope.isLogged = false;
                $scope.isAdmin = false;
                $scope.username = '';
                $location.path('/');
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.isLogged = false;
            $scope.isAdmin = false;
            $scope.username = '';
            $scope.login = login;
            $scope.logout = logout;

            getUser();


        }
    ]);

}());
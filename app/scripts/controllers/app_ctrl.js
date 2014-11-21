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

            function getSession(redirect) {
                UserService.getSessionData().then(function(response) {
                    console.dir(response.data);
                    $scope.isLogged = true;
                    $scope.username = response.data.username;
                    $scope.hasAdminRights = response.data.role === 'Administrator';
                    AuthTokenService.setAuthenticated(true);
                    UserService.setUserName(response.data.username);
                    if (redirect) {
                        $location.path('/');
                    }
                });
            }

            function login(username, password){
                if (username !== undefined && password !== undefined) {
                    UserService.login(username, password)
                        .success(function(data) {
                            AuthTokenService.setToken(data.token);
                            $scope.login.email = '';
                            $scope.login.password = '';
                            getSession(true);
                        })
                        .error(function(status, data){
                            console.log(status);
                            console.log(data);
                        });
                    }
            }

            function logout() {
                UserService.logout();
                UserService.setUserName('');
                AuthTokenService.setAuthenticated(false);
                $scope.isLogged = false;
                $scope.hasAdminRights = false;
                $scope.username = '';
                $location.path('/');
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.isLogged = false;
            $scope.hasAdminRights = false;
            $scope.username = '';
            $scope.login = login;
            $scope.logout = logout;
            getSession();
        }
    ]);

}());
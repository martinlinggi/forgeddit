/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    'use strict';


    angular.module('forgedditApp').controller('AppCtrl', ['$scope', '$location', 'AuthTokenService', 'UserService',
        function ($scope, $location, AuthTokenService, UserService) {

            $scope.isLogged = false;
            $scope.isAdmin = false;
            $scope.username = '';

            function getUser() {
                UserService.getUser().then(function(response) {
                    console.dir(response.data);
                    $scope.isLogged = true;
                    $scope.username = response.data.username;
                    $scope.isAdmin = response.data.role === 'Administrator';
                });
            }

            getUser();

            $scope.login = function (username, password) {
                if (username !== undefined && password !== undefined) {

                    UserService.login(username, password).then(function (response) {
                        getUser();
                        $location.path('/');
                        $scope.login.email = '';
                        $scope.login.password = '';
                    }, function () {
                    });
                }
            };

            $scope.logout = function () {
                UserService.logout();
                $scope.isLogged = false;
                $scope.isAdmin = false;
                $scope.username = '';
                $location.path('/');
            };

        }
    ]);

}());
/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService',
        function ($scope, $location, $window, UserService) {

            //Admin User Controller (login, logout)
            $scope.login = function (username, password) {
                if (username !== undefined && password !== undefined) {

                    UserService.login(username, password).then(function (response) {
                        $location.path('/admin');
                    }).error(function (status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            };

            $scope.logout = function () {
                UserService.logout();
                $location.path('/');
            };
        }
    ]);

}());
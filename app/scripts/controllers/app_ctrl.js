/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    'use strict';


    angular.module('forgedditApp').controller('AppCtrl', ['$scope', 'AuthTokenService', 'UserService',
        function AdminUserCtrl($scope, AuthTokenService, UserService) {

            $scope.isLogged = AuthTokenService.isLogged;
            $scope.username = UserService.getUser();

        }
    ]);

}());
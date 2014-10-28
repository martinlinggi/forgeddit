/**
 * Created by ma-li on 23.10.14.
 */


forgedditApp.controller('AppCtrl', ['$scope', 'AuthenticationService',
    function AdminUserCtrl($scope, AuthenticationService) {

        $scope.isLogged = AuthenticationService.isLogged;
        $scope.username = AuthenticationService.username;

    }
]);
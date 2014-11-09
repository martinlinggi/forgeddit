/**
 * Created by martinlinggi on 26.10.14.
 */
(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminUserListCtrl', ['$scope', 'UserDataService',
        function ($scope, UserDataService) {

            UserDataService.getUsers()
                .then(function (res) {
                    $scope.users = res.data;
                }, function (error) {
                    console.log('An error occured!', error);
                });
        }]);
}());
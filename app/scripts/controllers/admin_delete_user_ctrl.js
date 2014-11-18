/**
 * @brief Angular-controller for deleting an user
 *
 * @file admin_delete_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminDeleteUserCtrl', ['$scope', '$routeParams', '$location', 'UserDataService',
        function ($scope, $routeParams, $location, UserDataService) {


            //=====================================================================
            // private functions
            //=====================================================================
            function goToAdminListView() {
                $location.path('/admin/users');
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

            function deleteAction(username) {
                UserDataService.deleteUserByName(username)
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

            $scope.deleteAction = deleteAction;
            $scope.cancelAction = cancelAction;

            getUser();

        }]);
}());
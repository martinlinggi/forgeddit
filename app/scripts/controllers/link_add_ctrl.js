/**
 * @brief Angular-controller for adding a new link
 *
 * @file link_add_ctrl.js
 * @author martin linggi
 */


(function() {
    'use strict';


    angular.module('forgedditApp').controller('addLinkController', ['$scope', 'ForgedditDataService', 'UserService',
        function ($scope, ForgedditDataService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function sendLink() {
                console.log('send clicked');
                var newLink = {
                    title: $scope.title,
                    url: $scope.url,
                    user: UserService.getUserName()
                };
                ForgedditDataService.addLink(newLink)
                    .success(function () {
                        $scope.links.push(newLink);
                        $scope.title = '';
                        $scope.url = '';
                        console.log('Success: link added');
                    })
                    .error(function () {
                        console.log('Error: link not added');
// TODO Fix Error when send link does not work
                    });
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.title = '';
            $scope.url = '';
            $scope.sendLink = sendLink;

        }]);

}());



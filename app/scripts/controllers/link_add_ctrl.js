/**
 * @brief Angular-controller for adding a new link
 *
 * @file link_add_ctrl.js
 * @author martin linggi
 */


(function() {
    'use strict';


    angular.module('forgedditApp').controller('addLinkController', ['$scope', 'ForgedditDataService', 'UserService', 'UtilityService',
        function ($scope, ForgedditDataService, UserService, UtilityService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function sendLink() {
                var title = $scope.title;
                var url = $scope.url;
                UtilityService.isImage(url)
                    .then(function(isImage) {
                        var newLink = {
                            title: title,
                            url: url,
                            user: UserService.getUserName(),
                            isImage: isImage
                        };
                        ForgedditDataService.addLink(newLink)
                            .success(function (data) {
                                $scope.links.push(data);
                                $scope.title = '';
                                $scope.url = '';
                                console.log('Success: link added');
                            })
                            .error(function () {
                                console.log('Error: link not added');
// TODO Fix Error when send link does not work
                            });
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



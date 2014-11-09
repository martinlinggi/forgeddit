/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    'use strict';


    angular.module('forgedditApp').controller('addLinkController', ['$scope', 'ForgedditDataService', function ($scope, ForgedditDataService) {
        $scope.title = '';
        $scope.url = '';
        $scope.sendLink = function () {
            console.log('send clicked');
            var newLink = {
                title: $scope.title,
                url: $scope.url,
                user: 'testuser'
            };
            ForgedditDataService.addLink(newLink)
                .success(function () {
                    console.log('Success: link added');
                })
                .error(function () {
                    console.log('Error: link not added');
// TODO Fix Error when send link does not work
                });
        };

    }]);

}());



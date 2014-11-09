/**
 * Created by ma-li on 22.10.14.
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('LinkVoteCtrl', ['$scope', 'ForgedditDataService', function ($scope, ForgedditDataService) {

        // Gets the event from the 'vote' buttons
        $scope.vote = function (link, value) {
            var id = link._id;
            ForgedditDataService.voteLink(id, value)
                .success(function () {
                    $scope.link.rate += value;
                })
                .error(function (data, status) {
                    console.log('An error occured!', status, data);
                });
        };
    }]);

}());

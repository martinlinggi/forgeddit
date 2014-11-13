/**
 * @brief Angular-controller for voting a link
 *
 * @file link_vote_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('LinkVoteCtrl', ['$scope', 'ForgedditDataService',
        function ($scope, ForgedditDataService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function vote(link, value) {
                var id = link._id;
                ForgedditDataService.voteLink(id, value)
                    .success(function () {
                        $scope.link.rate += value;
                    })
                    .error(function (data, status) {
                        console.log('An error occured!', status, data);
                    });
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.vote = vote;

        }]);

}());

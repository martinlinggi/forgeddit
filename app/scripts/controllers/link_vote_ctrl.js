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

            /**
             * @brief Vote-Action
             * @param link
             * @param value
             */
            function voteAction(value) {
                var id = $scope.link._id;
                var userName = $scope.username;
                ForgedditDataService.voteLink(id, userName, value)
                    .success(function () {
                        $scope.link.rate += value;
                        var index = getAlreadyVotedIndex(-value);
                        if (index > -1) {
                            $scope.alreadyVoteList.splice(index,1);
                        }
                        else {
                            $scope.alreadyVoteList.push({linkId:id, vote:value});
                        }
                        refreshVoteArrows();
                    })
                    .error(function (data, status) {
                        console.log('An error occured!', status, data);
                    });
            }

            /**
             * @brief Refreshes the Flags for the UI-Indication of the Arrows
             */
            function refreshVoteArrows() {
                $scope.isVoteUpActive = getAlreadyVotedIndex(1) === -1;
                $scope.isVoteDownActive = getAlreadyVotedIndex(-1) === -1;
            }

            /**
             * @brief Checks if the user has already voted this link (up or down)
             *
             * If the user has already voted the link a non negative number is returned, otherwise -1.
             * The number is th index of the entry in the 'already-voted' list
             *
             * @param value 1=vote up, -1=vote down
             * @returns {number} index of the 'already-voted'-entry in the list
             */
            function getAlreadyVotedIndex(value) {
                for (var i = 0, n = $scope.alreadyVoteList.length; i < n; i++) {
                    if ($scope.alreadyVoteList[i].linkId === $scope.link._id && $scope.alreadyVoteList[i].vote === value) {
                        console.log('Vote disabled: ' + $scope.link._id + ': ' + $scope.link.title + ' value: ' + value);
                        return i;
                    }
                }
                return -1;
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.isVoteUpActive = false;
            $scope.isVoteDownActive = false;
            $scope.$watch(function(scope) {return $scope.alreadyVoteList}, refreshVoteArrows());
            $scope.voteAction = voteAction;
        }]);

}());

/**
* @brief Angular-controller for showing the link-list
*
* @file link_list_ctrl.js
* @author martin linggi
*/

(function() {
    'use strict';


    angular.module('forgedditApp').controller('LinkListCtrl', ['$scope', 'ForgedditDataService', 'UtilityService', 'AuthTokenService', 'UserService', 'SocketService',
        function ($scope, ForgedditDataService, UtilityService, AuthTokenService, UserService, SocketService) {

            //=====================================================================
            // private functions
            //=====================================================================

            /**
             * @brief Calculates a duration from now to a given timestamp
             * @param time timestamp when something happened
             * @returns {*} String (duration)
             */
            function getTimeAgo(time) {
                return UtilityService.getDuration(time);
            }

            /**
             * @brief Sets the predicate and sort-order for the list
             * @param searchPredicate name of the attribute to sort
             * @param reverse sort-order
             */
            function sort(searchPredicate, reverse) {
                $scope.searchPredicate = searchPredicate;
                $scope.reverse = reverse;
                if ($scope.newLinks.length > 0)
                {
                    for (var i = 0, n = $scope.newLinks.length; i < n; i++) {
                        $scope.links.push($scope.newLinks[i]);
                    }
                    $scope.newLinks = [];
                }
            }

            /**
             * @brief Filter: Only Forgeddables which the user had commented
             * @param link fordeddable to check
             * @returns {boolean} true: is valid
             */
            function filterMyCommnentedForgeddables(link) {
                for (var i = 0, n = link.comments.length; i < n; i++) {
                    if (link.comments[i].user === UserService.getUserName()) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * @brief Filter: Only Forgeddables which the user had voted
             * @param link fordeddable to check
             * @returns {boolean} true: is valid
             */
            function filterMyVotedForgeddables(link) {
                for (var i = 0, n = $scope.alreadyVoteList.length; i < n; i++) {
                    if ($scope.alreadyVoteList[i].linkId === link._id) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * @brief Sets the filter expression
             * @param filterPredicate
             */
            function filter(filterPredicate) {
                var expression;
                if (filterPredicate === 'user') {
                    expression = {};
                    expression.user = UserService.getUserName();
                }
                else if (filterPredicate === 'commented') {
                    expression = filterMyCommnentedForgeddables;
                }
                else if (filterPredicate === 'voted') {
                    expression = filterMyVotedForgeddables;
                }
                $scope.filterExpression = expression;
            }

            /**
             * @brief Gets all the forgeddables from the data-service
             */
            function getLinks() {
                ForgedditDataService.getLinks()
                    .then(function (res) {
                        $scope.links = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            /**
             * @brief Gets all the votes for the user (if logged in) from the data-service
             */
            function getVotes() {
                var userName = UserService.getUserName();
                ForgedditDataService.getVotes(userName)
                    .then(function (res) {
                        $scope.alreadyVoteList = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            /**
             * @brief Socket-Update: Changed link
             * @param id the id of the changed link
             */
            function updateLink(id) {
                ForgedditDataService.getLink(id)
                    .then(function (res) {
                        for (var i = 0, n = $scope.links.length; i < n; i++) {
                            if ($scope.links[i]._id === id){
                                $scope.links[i] = res.data;
                            }
                        }
                    })
            }

            /**
             * @brief Socket-Update: New Link
             * @param newLink the new link
             */
            function newLink(newLink) {
                // only add if not already exists
                for (var i = 0, n = $scope.links.length; i < n; i++)
                {
                    if (newLink._id === $scope.links[i]._id)
                    {
                        return;
                    }
                }
                $scope.newLinks.push(newLink);
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.getTimeAgo = getTimeAgo;
            $scope.sort = sort;
            $scope.filter = filter;
            $scope.filterExpression = '';
            $scope.links = [];
            $scope.alreadyVoteList = [];
            $scope.newLinks = [];
            getVotes();
            getLinks();
            SocketService.on('updateLink', updateLink);
            SocketService.on('newLink', newLink);
        }]);

}());
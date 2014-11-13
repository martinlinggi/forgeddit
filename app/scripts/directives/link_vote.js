/**
 * @brief Angular-directive for the vote-link template
 *
 * @file link_votes.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkVoteView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/link_vote_view.html',
            controller: 'LinkVoteCtrl'

        };
    });

}());
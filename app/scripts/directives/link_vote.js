/**
 * Created by ma-li on 12.10.14.
 */

(function() {
    'use strict';


    angular.module('forgedditApp').directive('linkVoteView', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/link_vote_view.html',
            controller: 'LinkVoteCtrl'

        };
    });

}());
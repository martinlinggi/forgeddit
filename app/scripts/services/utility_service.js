/**
 * @brief Angular-Service for the utility-functions
 *
 * @file util_service.js
 * @author martin linggi
 */


(function() {
    'use strict';

    angular.module('forgedditApp').factory('VoteDataService', ['$http', function ($http) {

        //=====================================================================
        // private functions
        //=====================================================================
        function getVotesByUserName(userName) {
            return $http.get('/api/votes/' + userName);
        }

        function addLink(newLink) {
            return $http.post('/api/links', newLink);
        }

        function voteLink(id, value) {
            return $http.put('/api/links/' + id + '/vote', {value: value});
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getLinks: getVotesByUserName,
            addLink: addLink,
            voteLink: voteLink
        };

    }]);

}());/**
 * Created by martinlinggi on 28.11.14.
 */

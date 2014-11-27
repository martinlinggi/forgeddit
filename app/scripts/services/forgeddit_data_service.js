/**
 * @brief Angular-Service for the REST-API of the link data
 *
 * @file forgeddit_data_service.js
 * @author martin linggi
 */


(function() {
    'use strict';

    angular.module('forgedditApp').factory('ForgedditDataService', ['$http', function ($http) {

        //=====================================================================
        // private functions
        //=====================================================================
        function getLinks() {
            return $http.get('/api/links');
        }

        function getLink(id) {
            return $http.get('/api/links/' + id);
        }

        function getVotes(userName) {
            return $http.get('/api/votes/' + userName);
        }

        function addLink(newLink) {
            return $http.post('/api/links', newLink);
        }

        function updateLink(id, linkData) {
            return $http.put('/api/links/' + id, linkData);
        }

        function voteLink(id, userName, value) {
            return $http.put('/api/links/' + id + '/vote', {value: value, userName: userName});
        }
		
		function addComment(id, newComment) {
            return $http.post('/api/links/' + id + '/comments', newComment);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getLinks: getLinks,
            getLink: getLink,
            getVotes: getVotes,
            addLink: addLink,
            updateLink: updateLink,
            voteLink: voteLink,
			addComment: addComment
        };

    }]);

}());
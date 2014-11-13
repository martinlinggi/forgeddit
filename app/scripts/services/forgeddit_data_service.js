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
            getLinks: getLinks,
            addLink: addLink,
            voteLink: voteLink
        };

    }]);

}());
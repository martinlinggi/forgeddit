/**
 * Created by ma-li on 06.10.14.
 */

(function() {
    'use strict';

    angular.module('forgedditApp').factory('ForgedditDataService', ['$http', function ($http) {

        var srv = {};

        srv.getLinks = function () {
            return $http.get('/api/links');
        };

        srv.addLink = function (newLink) {
            return $http.post('/api/links', newLink);
        };

        srv.voteLink = function (id, value) {
            return $http.put('/api/links/' + id + '/vote', {value: value});
        };

        //public API
        return {
            getLinks: function () {
                return srv.getLinks();
            },
            addLink: function (newLink) {
                return srv.addLink(newLink);
            },
            voteLink: function (id, value) {
                return srv.voteLink(id, value);
            }
        };

    }]);

}());
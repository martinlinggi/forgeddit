/**
 * Created by ma-li on 06.10.14.
 */
forgedditApp.factory('ForgedditDataService', ['$http', function($http) {

    var srv = {};

    srv._baseUrl = 'http://localhost:3000';

    srv.getLinks = function() {
        return $http.get(srv._baseUrl + '/api/links');
    };

    srv.addLink = function(newLink) {
        return $http.post(srv._baseUrl + '/api/links', newLink)
    };

    srv.voteLink = function(id, value) {
        return $http.put(srv._baseUrl + '/api/links/' +id + '/vote', {value: value});
    };

    //public API
    return {
        getLinks: function() {
            return srv.getLinks();
        },
        addLink: function(newLink) {
            return srv.addLink(newLink)
        },
        voteLink: function(id, value) {
            return srv.voteLink(id, value);
        }
    };

}]);
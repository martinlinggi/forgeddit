/**
 * Created by ma-li on 23.10.14.
 */

forgedditApp.factory('UserService', ['$http', 'API_URL', 'AuthTokenService',
    function($http, API_URL, AuthTokenService) {

    var srv = {};

    srv.logIn = function(username, password) {
        return $http.post(API_URL + '/api/users/login', {username: username, password: password});
    };

    // public API
    return {
        logIn: function(username, password) {
            return srv.logIn(username, password)
        },

        logOut: function() {

        }
    }

}]);
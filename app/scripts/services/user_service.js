/**
 * Created by ma-li on 23.10.14.
 */

forgedditApp.factory('UserService', ['$http', function($http) {

    var srv = {};

    srv.logIn = function(username, password) {
        return $http.post('/api/users/login', {username: username, password: password});
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
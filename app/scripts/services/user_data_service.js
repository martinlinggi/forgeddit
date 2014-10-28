/**
 * Created by martinlinggi on 26.10.14.
 */

forgedditApp.factory('UserDataService', ['$http', function($http) {

    var srv = {};

    srv._baseUrl = 'http://localhost:3000';

    srv.getUsers = function() {
        return $http.get(srv._baseUrl + '/api/users');
    };

    srv.addUser = function(newUser) {
        return $http.post(srv._baseUrl + '/api/users', newUser)
    };

    srv.updateUser = function(user) {
        return $http.put(srv._baseUrl + '/api/users/' + user.name, user)
    };

    srv.addUser = function(user) {
        return $http.post(srv._baseUrl + '/api/users/' + user.name, user)
    };

    //public API
    return {
        getUsers: function() {
            return srv.getUsers();
        },
        addUser: function(newUser) {
            return srv.addLink(newUser);
        },
        updateUser: function(user) {
            return srv.updateUser(user);
        },
        deleteUser: function(user) {
            return srv.deleteUser(user);
        }
    };

}]);
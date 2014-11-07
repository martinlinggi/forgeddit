/**
 * Created by martinlinggi on 26.10.14.
 */

forgedditApp.factory('UserDataService', ['$http', function($http) {

    var srv = {};

    srv._baseUrl = 'http://localhost:3000';

    srv.getUsers = function() {
        return $http.get(srv._baseUrl + '/api/users');
    };

    srv.getUser = function(userName) {
        console.log('GET user: ', userName);
        return $http.get(srv._baseUrl + '/api/users/' + userName);
    };

    srv.addUser = function(newUser) {
        console.log('POST new user: ', newUser);
        return $http.post(srv._baseUrl + '/api/users', newUser)
    };

    srv.updateUser = function(username, user) {
        return $http.put(srv._baseUrl + '/api/users/' + username, user)
    };

    srv.deleteUser = function(user) {
        return $http.delete(srv._baseUrl + '/api/users/' + user.name)
    };

    //public API
    return {
        getUsers: function() {
            return srv.getUsers();
        },
        getUser: function(userName) {
            return srv.getUser(userName);
        },
        addUser: function(newUser) {
            return srv.addUser(newUser);
        },
        updateUser: function(username, user) {
            return srv.updateUser(username, user);
        },
        deleteUser: function(user) {
            return srv.deleteUser(user);
        }
    };

}]);
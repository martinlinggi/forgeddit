/**
 * Created by martinlinggi on 26.10.14.
 */
(function() {
    'use strict';


    angular.module('forgedditApp').factory('UserDataService', ['$http', function ($http) {

        var srv = {};

        srv.getUsers = function () {
            return $http.get('/api/users');
        };

        srv.getUser = function (userName) {
            console.log('GET user: ', userName);
            return $http.get('/api/users/' + userName);
        };

        srv.addUser = function (newUser) {
            console.log('POST new user: ', newUser);
            return $http.post('/api/users', newUser);
        };

        srv.updateUser = function (username, user) {
            return $http.put('/api/users/' + username, user);
        };

        srv.deleteUser = function (user) {
            return $http.delete('/api/users/' + user.name);
        };

        //public API
        return {
            getUsers: function () {
                return srv.getUsers();
            },
            getUser: function (userName) {
                return srv.getUser(userName);
            },
            addUser: function (newUser) {
                return srv.addUser(newUser);
            },
            updateUser: function (username, user) {
                return srv.updateUser(username, user);
            },
            deleteUser: function (user) {
                return srv.deleteUser(user);
            }
        };

    }]);

}());
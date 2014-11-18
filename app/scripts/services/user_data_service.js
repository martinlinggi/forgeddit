/**
 * @brief Angular-Service for the REST API of the user data
 *
 * @file user_data_service.js
 * @author martin linggi
 */
(function() {
    'use strict';


    angular.module('forgedditApp').factory('UserDataService', ['$http', function ($http) {

        //=====================================================================
        // private functions
        //=====================================================================
        function getUsers() {
            return $http.get('/api/users');
        }

        function getUser(userName) {
            console.log('GET user: ', userName);
            return $http.get('/api/users/' + userName);
        }

        function addUser(newUser) {
            console.log('POST new user: ', newUser);
            return $http.post('/api/users', newUser);
        }

        function updateUser(username, user) {
            return $http.put('/api/users/' + username, user);
        }

        function deleteUserByName(username) {
            return $http.delete('/api/users/' + username);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getUsers: getUsers,
            getUser: getUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUserByName: deleteUserByName
        };

    }]);

}());
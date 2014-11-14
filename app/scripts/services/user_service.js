/**
 * @brief Angular-Service for the login and logout of the user
 *
 * @file user_service.js
 * @author martin linggi
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('UserService', ['$http', '$q', 'AuthTokenService', function ($http, $q, AuthTokenService) {

        //=====================================================================
        // private functions
        //=====================================================================
        function login(username, password) {
            return $http.post('/api/users/login', {username: username, password: password});
        }

        function logout() {
            AuthTokenService.setToken();
            AuthTokenService.setAuthenticated(false);
        }

        function getUser() {
            if (AuthTokenService.getToken()) {
                return $http.get('/api/users/me');
            } else {
                return $q.reject({ data: 'client has no auth token' });
            }
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            login: login,
            logout: logout,
            getUser: getUser
        };

    }]);

}());
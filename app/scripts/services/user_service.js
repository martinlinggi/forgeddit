/**
 * @brief Angular-Service for the login and logout of the user
 *
 * @file user_service.js
 * @author martin linggi
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('UserService', ['$http', '$q', 'AuthTokenService', function ($http, $q, AuthTokenService) {

        var _userName = "";
        var _isAdmin = false;


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

        function getSessionData() {
            if (AuthTokenService.getToken()) {
                return $http.get('/api/users/me');
            } else {
                return $q.reject({ data: 'client has no auth token' });
            }
        }

        function setUser(userName, isAdmin){
            _userName = userName;
            _isAdmin = isAdmin;
        }

        function getUserName() {
            return _userName;
        }

        function isAdmin() {
            return _isAdmin;
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            login: login,
            logout: logout,
            getSessionData: getSessionData,
            setUser: setUser,
            getUserName: getUserName,
            isAdmin: isAdmin

        };

    }]);

}());
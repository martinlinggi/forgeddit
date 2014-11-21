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
        var _isAuth = false;


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

        function setUserName(userName){
            _userName = userName;
        }

        function getUserName() {
            return _userName;
        }


        //=====================================================================
        // Service API
        //=====================================================================
        return {
            login: login,
            logout: logout,
            getSessionData: getSessionData,
            setUserName: setUserName,
            getUserName: getUserName

        };

    }]);

}());
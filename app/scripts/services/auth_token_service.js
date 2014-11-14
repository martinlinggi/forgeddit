/**
 * @brief Angular-Service for the authentication token management
 *
 * @file auth_token_service.js
 * @author martin linggi
 */


(function(){
    'use strict';

    angular.module('forgedditApp').factory('AuthTokenService', ['$window', function ($window) {

        //=====================================================================
        // private variables
        //=====================================================================

        var store = $window.sessionStorage;
        var key = 'auth-token';
        var isAuth = false;

        //=====================================================================
        // private functions
        //=====================================================================
        function getToken() {
            return store.getItem(key);
        }

        function setToken(token) {
            if (token) {
                store.setItem(key, token);
            } else {
                store.removeItem(key);
            }
        }

        function isAuthenticated()
        {
            return isAuth;
        }

        function setAuthenticated(state)
        {
            isAuth = state;
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getToken: getToken,
            setToken: setToken,
            isAuthenticated: isAuthenticated,
            setAuthenticated: setAuthenticated
        };

    }]);
}());


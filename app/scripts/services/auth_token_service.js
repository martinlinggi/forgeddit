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

        var _store = $window.localStorage;
        var _key = 'auth-token';
        var _isAuth;

        //=====================================================================
        // private functions
        //=====================================================================
        function getToken() {
            return _store.getItem(_key);
        }

        function setToken(token) {
            if (token) {
                _store.setItem(_key, token);
            } else {
                _store.removeItem(_key);
            }
        }

        function isAuthenticated()
        {
            return _isAuth;
        }

        function setAuthenticated(state)
        {
            _isAuth = state;
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


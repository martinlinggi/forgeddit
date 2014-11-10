/**
 * Created by martinlinggi on 07.11.14.
 */

(function(){
    'use strict';

    angular.module('forgedditApp').factory('AuthTokenService', ['$window', function AuthTokenFactory($window) {

        var store = $window.sessionStorage;
        var key = 'auth-token';
        var isAuth = false;

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

        // Public API
        return {
            getToken: getToken,
            setToken: setToken,
            isAuthenticated: isAuthenticated,
            setAuthenticated: setAuthenticated
        };

    }]);
}());


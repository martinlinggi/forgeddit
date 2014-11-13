/**
 * @brief Angular-Service injects the authentication token into the header of the requests
 *
 * @file token_interceptor.js
 * @author martin linggi
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('TokenInterceptor', ['AuthTokenService', function (AuthTokenService) {

        //=====================================================================
        // private functions
        //=====================================================================
        function addToken(config) {
            var token = AuthTokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            request: addToken
        };
    }]);
}());
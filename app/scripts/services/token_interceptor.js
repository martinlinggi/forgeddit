/**
 * @brief Angular-Service injects the authentication token into the header of the requests
 *
 * @file token_interceptor.js
 * @author martin linggi
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('TokenInterceptor', ['$q', '$location', 'AuthTokenService', function ($q, $location, AuthTokenService) {

        //=====================================================================
        // private functions
        //=====================================================================
        function request(config) {
            config.headers = config.headers || {};
            var token = AuthTokenService.getToken();
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        function response(res) {
            if (res !== null && res.status === 200 && AuthTokenService.getToken() && !AuthTokenService.isAuthenticated()) {
               AuthTokenService.setAuthenticated(true);
            }
            return res || $q.when(res);
        }

        function responseError(rejection) {
            if (rejection !== null && rejection.status === 401 && AuthTokenService.getToken() && AuthTokenService.isAuthenticated()) {
                AuthTokenService.setToken();
                AuthTokenService.setAuthenticated(false);
                $location.path('/');
            }
            return $q.reject(rejection);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };
    }]);
}());
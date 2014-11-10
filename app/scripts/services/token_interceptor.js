/**
 * Created by ma-li on 23.10.14.
 */
(function() {
    'use strict';


    angular.module('forgedditApp').factory('TokenInterceptor', ['AuthTokenService', function (AuthTokenService) {
        return {
            request: addToken
        };

        function addToken(config) {
            var token = AuthTokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }]);
}());
/**
 * Created by ma-li on 23.10.14.
 */
(function() {
    'use strict';


    angular.module('forgedditApp').factory('TokenInterceptor', ['$q', '$window', '$location', 'AuthTokenService',
        function ($q, $window, $location, AuthTokenService) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                    }
                    return config;
                },

                requestError: function (rejection) {
                    return $q.reject(rejection);
                },

                /* Set Authentication.isAuthenticated to true if 200 received */
                response: function (response) {
                    if (response !== null && response.status === 200 && $window.sessionStorage.token && !AuthTokenService.isAuthenticated()) {
                        AuthTokenService.setAuthenticated(true);
                    }
                    return response || $q.when(response);
                },

                /* Revoke client authentication if 401 is received */
                responseError: function (rejection) {
                    if (rejection !== null && rejection.status === 401 && ($window.sessionStorage.token || AuthTokenService.isAuthenticated())) {
                        delete $window.sessionStorage.token;
                        AuthTokenService.setAuthenticated(false);
                        $location.path('/admin/login');
                    }

                    return $q.reject(rejection);
                }
            };
        }]);
}());
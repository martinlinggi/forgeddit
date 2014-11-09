/**
 * Created by ma-li on 23.10.14.
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('UserService', ['$http', '$q', 'AuthTokenService', function ($http, $q, AuthTokenService) {

        function login(username, password) {
            return $http.post('/api/users/login', {username: username, password: password})
                .then(function success(response) {
                    AuthTokenService.setToken(response.data.token);
                    AuthTokenService.setAuthenticated(true);
                    return response;
                });
        }

        function logout() {
            AuthTokenService.setToken();
            AuthTokenService.setAuthenticated(false);
        }

        function getUser() {
            if (AuthTokenService.getToken()) {
                return $http.get('/me');
            } else {
                return $q.reject({ data: 'client has no auth token' });
            }
        }

        return {
            login: login,
            logout: logout,
            getUser: getUser
        };

    }]);

}());
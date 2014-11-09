/**
 * Main-Function of the application
 */

(function(){
    'use strict';

    var forgedditApp = angular.module('forgedditApp', ['ngRoute']);

    // Authentication-Token
    forgedditApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });

    // Routes
    forgedditApp.config(function($routeProvider) {
        $routeProvider

            .when ('/', {
            templateUrl: 'templates/link_view.html',
            controller: 'AppCtrl',
            access: { requiredLogin: false}
        })

            .when ('/login', {
            templateUrl: 'templates/login_view.html',
            controller: 'AdminUserCtrl',
            access: { requiredLogin: false}
        })

            .when ('/logout', {
            templateUrl: 'templates/logout_view.html',
            controller: 'AdminUserCtrl',
            access: { requiredLogin: true}
        })

            .when ('/admin/users', {
            templateUrl: 'templates/admin/user_list_view.html',
            controller: 'AdminUserListCtrl',
            access: { requiredLogin: false}
        })

            .when ('/admin/users/:username', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminEditUserCtrl',
            access: { requiredLogin: false}
        })

            .otherwise({
                redirectTo: '/'
            });
    });

    forgedditApp.run(function($rootScope, $location, AuthTokenService) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if (nextRoute.access.requiredLogin && !AuthTokenService.isLogged) {
                $location.path('/login');
            }
        });
    });
}());
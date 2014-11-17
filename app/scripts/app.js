/**
 * @brief  Main-script of the of the web-client
 *
 * Initializes Angular
 * - Authentication-Token
 * - Routes
 *
 * @file app.js
 * @author martin linggi
 */

(function(){
    'use strict';

    var forgedditApp = angular.module('forgedditApp', ['ngRoute']);

    // Configuration of authentication-token
    forgedditApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });

    // Configuration of the routes
    forgedditApp.config(['$locationProvider', '$routeProvider', function($location, $routeProvider) {
        $routeProvider

            .when ('/', {
            templateUrl: 'templates/link_view.html',
            controller: 'AppCtrl',
            access: {requiredLogin: false}
        })

            .when ('/login', {
            templateUrl: 'templates/login_view.html',
            access: {requiredLogin: false}
        })

            .when ('/admin/users', {
            templateUrl: 'templates/admin/user_list_view.html',
            controller: 'AdminUserListCtrl',
            access: {requiredLogin: true}
        })

            .when ('/admin/users/new', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminNewUserCtrl',
            access: {requiredLogin: true}
        })

            .when ('/admin/users/:username', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminEditUserCtrl',
            access: {requiredLogin: true}
        })

            .otherwise({
                redirectTo: '/',
                access: {requiredLogin: false}
            });
    }]);

    forgedditApp.run(function($rootScope, $location, AuthTokenService) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if (nextRoute.access.requiredLogin && !AuthTokenService.isAuthenticated()) {
                $location.path("/admin/login");
            }
        });
    });
}());
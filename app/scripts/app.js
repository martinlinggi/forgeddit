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
    forgedditApp.config(function($routeProvider) {
        $routeProvider

            .when ('/', {
            templateUrl: 'templates/link_view.html',
            controller: 'AppCtrl'
        })

            .when ('/login', {
            templateUrl: 'templates/login_view.html'
        })

            .when ('/admin/users', {
            templateUrl: 'templates/admin/user_list_view.html',
            controller: 'AdminUserListCtrl'
        })

            .when ('/admin/users/new', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminNewUserCtrl'
        })

            .when ('/admin/users/:username', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminEditUserCtrl'
        })

            .otherwise({
                redirectTo: '/'
            });
    });

}());
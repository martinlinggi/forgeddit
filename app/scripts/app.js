/**
 * Created by ma-li on 11.10.14.
 */


var forgedditApp = angular.module('forgedditApp', ['ngRoute']);

forgedditApp.constant('API_URL', 'http://localhost:3000');

forgedditApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

forgedditApp.config(function($routeProvider) {
    $routeProvider

        //Public routes
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
        })
});

forgedditApp.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            $location.path("/login");
        }
    });
});
/**
 * @brief Angular-directive for the header template
 *
 * @file header.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('headerDiv', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/header.html'

        };
    });

}());

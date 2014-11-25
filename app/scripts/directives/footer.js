/**
 * @brief Angular-directive for the footer template
 *
 * @file footer.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('footerDiv', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/footer.html'

        };
    });

}());

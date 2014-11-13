/**
 * @brief Angular-directive for the add-link-formular
 *
 * @file link_add.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkAddView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================
        return {
            restrict: 'E',
            templateUrl: 'templates/link_add_view.html',
            controller: 'addLinkController'
        };
    });

}());
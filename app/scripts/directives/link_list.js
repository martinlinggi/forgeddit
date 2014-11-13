/**
 * @brief Angular-directive for the link-list
 *
 * @file link_list.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkListView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================
        return {
            restrict: 'E',
            templateUrl: 'templates/link_list_view.html',
            controller: 'LinkListCtrl'
        };
    });

}());
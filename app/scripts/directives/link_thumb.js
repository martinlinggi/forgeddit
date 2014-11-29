/**
 * @brief Angular-directive for the thumbs-image template
 *
 * @file link_thumb.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkThumbView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/link_thumb_view.html'
        };
    });

}());
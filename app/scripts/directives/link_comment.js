/**
* @brief Angular-directive for the link-content
    *
    * @file link_content.js
* @author martin linggi
*/

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkCommentView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/link_comment_view.html',
            controller: 'LinkCommentCtrl'
        };
    });

}());
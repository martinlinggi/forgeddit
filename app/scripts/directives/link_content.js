/**
 * Created by ma-li on 12.10.14.
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkContentView', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/link_content_view.html'
        };
    });

}());
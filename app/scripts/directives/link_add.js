/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkAddView', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/link_add_view.html',
            controller: 'addLinkController'
        };
    });

}());
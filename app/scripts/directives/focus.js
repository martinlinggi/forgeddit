/**
 * Created by martinlinggi on 23.11.14.
 */
// Common directive for Focus

(function() {
    'use strict';

    angular.module('forgedditApp').directive('focus', ['$timeout',

        function($timeout) {
            return {
                scope : {
                    trigger : '@focus'
                },

                link : function(scope, element) {
                    scope.$watch('trigger', function(value) {
                        if (value === "true") {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }]);
}());


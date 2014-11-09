/**
 * Created by ma-li on 11.10.14.
 */

(function() {
    'use strict';


    angular.module('forgedditApp').controller('LinkListCtrl', ['$scope', 'ForgedditDataService', 'TimeCalculationService',
        function ($scope, ForgedditDataService, TimeCalculationService) {

            $scope.getTimeAgo = function (time) {
                return TimeCalculationService.getDuration(time);
            };

            $scope.sort = function (predicate, reverse) {
                $scope.predicate = predicate;
                $scope.reverse = reverse;
            };

            ForgedditDataService.getLinks()
                .then(function (res) {
                    $scope.links = res.data;
                }, function (error) {
                    console.log('An error occured!', error);
                });
        }]);

}());
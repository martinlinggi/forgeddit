/**
* @brief Angular-controller for showing the link-list
*
* @file link_list_ctrl.js
* @author martin linggi
*/

(function() {
    'use strict';


    angular.module('forgedditApp').controller('LinkListCtrl', ['$scope', 'ForgedditDataService', 'TimeCalculationService',
        function ($scope, ForgedditDataService, TimeCalculationService) {

            //=====================================================================
            // private functions
            //=====================================================================

           function getTimeAgo(time) {
               return TimeCalculationService.getDuration(time);
           }

           function sort(predicate, reverse) {
               $scope.predicate = predicate;
               $scope.reverse = reverse;
           }

            function getLinks() {
                ForgedditDataService.getLinks()
                    .then(function (res) {
                        $scope.links = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }


            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.getTimeAgo = getTimeAgo;
            $scope.sort = sort;

            getLinks();

        }]);

}());
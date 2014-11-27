/**
 * @brief Angular-controller for link content view
 *
 * @file link_content_ctrl.js
 * @author markus.wirrer
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('LinkContentCtrl', ['$scope', 'ForgedditDataService', 'UserService',
        function ($scope, ForgedditDataService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================
			
			//----------------------------------------------------------------------
			// The method toggles the display state of the comments part in the 
			// link_content_view template by setting the showComments variable
			//----------------------------------------------------------------------
			function toggleComments(link) {
				if($scope.showComments == true) {
					$scope.showComments = false;
					$scope.showAddComment = false;
					}
				else {
					$scope.showComments = true;
					$scope.showAddComment = true;
					}
            }

            function doUpdateLink() {
                var linkId = $scope.link._id;
                var link = {
                    title: $scope.link.title
                };
                ForgedditDataService.updateLink(linkId, link)
                    .success(function () {
                        console.log('Success: link updated');
                    })
                    .error(function () {
                        console.log('Error: link not updated');
// TODO Fix Error when send link does not work
                    });
            }




            //=====================================================================
            // Controller API
            //=====================================================================


            $scope.canDelete = $scope.link.user === UserService.getUserName() || UserService.isAdmin();
            $scope.canEdit = $scope.link.user === UserService.getUserName();
            $scope.isEdit = false;
            $scope.toggleComments = toggleComments;
            $scope.doUpdateLink = doUpdateLink;

        }]);

}());

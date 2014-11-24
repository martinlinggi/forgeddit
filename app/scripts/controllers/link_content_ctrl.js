/**
 * @brief Angular-controller for link content view
 *
 * @file link_content_ctrl.js
 * @author markus.wirrer
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('LinkContentCtrl', ['$scope', 'ForgedditDataService',
        function ($scope, ForgedditDataService) {

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
			
			//----------------------------------------------------------------------
			// The method sends a comment to the backend
			//----------------------------------------------------------------------
			function sendComment(link) {
                console.log('send comment clicked');
				var id = link._id;
                var theComment = {
                    text: $scope.$$childTail.newComment,   // this is a somehow undocumented element because child scopes should not accessed from parent nodes in angular :-)
					user: $scope.$parent.$parent.username  // this is an access to the username in a parent scope of the application
                };
				console.log('comment to add:' + theComment.text);
                console.log('user to add:' + theComment.user);
                ForgedditDataService.addComment(id, theComment)
                    .success(function () {
                        console.log('Success: comment added');
						var addedComment = {
							text: theComment.text,
							time: Date.now(),
							user: theComment.user
						};
						$scope.link.comments.push(addedComment);
						$scope.showAddComment = false;
                        console.log('Success: DOM Comment Object added');
                    })
                    .error(function () {
                        console.log('Error: comment not added');
                    });
            }
			
            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.toggleComments = toggleComments;
			$scope.sendComment = sendComment;

        }]);

}());

/**
 * @brief Angular-controller for link content view
 *
 * @file link_content_ctrl.js
 * @author markus.wirrer
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('LinkCommentCtrl', ['$scope', 'ForgedditDataService', 'UserService',
        function ($scope, ForgedditDataService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================

			//----------------------------------------------------------------------
			// The method sends a comment to the backend
			//----------------------------------------------------------------------
			function sendComment(newComment) {
                console.log('send comment clicked');
				var linkId = $scope.link._id;
                var theComment = {
                    text: newComment,
					user: UserService.getUserName()
                };
				console.log('comment to add:' + theComment.text);
                console.log('user to add:' + theComment.user);
                ForgedditDataService.addComment(linkId, theComment)
                    .success(function () {
                        console.log('Success: comment added');
						var addedComment = {
							text: theComment.text,
							time: Date.now(),
							user: theComment.user
						};
                        $scope.newComment = '';
						$scope.comments.push(addedComment);
                        console.log('Success: DOM Comment Object added');
                    })
                    .error(function () {
                        console.log('Error: comment not added');
                        $scope.newComment = newComment;
                    });
            }
			
            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.comments = $scope.link.comments;
            $scope.newComment = '';
            $scope.currentUserName = UserService.getUserName();
            $scope.sendComment = sendComment;


        }]);

}());

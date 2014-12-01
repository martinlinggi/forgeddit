/**
 * @brief  Main-script of the of the web-client
 *
 * Initializes Angular
 * - Authentication-Token
 * - Routes
 *
 * @file app.js
 * @author martin linggi
 */

(function(){
    'use strict';

    var forgedditApp = angular.module('forgedditApp', ['ngRoute']);

    // Configuration of authentication-token
    forgedditApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });

    // Configuration of the routes
    forgedditApp.config(['$locationProvider', '$routeProvider', function($location, $routeProvider) {
        $routeProvider

            .when ('/', {
            templateUrl: 'templates/link_view.html',
            controller: 'AppCtrl',
            access: {requiredLogin: false}
        })

            .when ('/login', {
            templateUrl: 'templates/login_view.html',
            access: {requiredLogin: false}
        })

            .when ('/user/create', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminNewUserCtrl',
            access: {requiredLogin: false}
        })

            .when ('/user/:username', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminEditUserCtrl',
            access: {requiredLogin: true}
        })

            .when ('/admin/users', {
            templateUrl: 'templates/admin/user_list_view.html',
            controller: 'AdminUserListCtrl',
            access: {requiredLogin: true}
        })

            .when ('/admin/users/new', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminNewUserCtrl',
            access: {requiredLogin: true}
        })

            .when ('/admin/users/:username', {
            templateUrl: '../templates/admin/user_form_view.html',
            controller: 'AdminEditUserCtrl',
            access: {requiredLogin: true}
        })

            .when ('/admin/users/:username/delete', {
            templateUrl: '../templates/admin/user_delete_view.html',
            controller: 'AdminDeleteUserCtrl',
            access: {requiredLogin: true}
        })

            .otherwise({
                redirectTo: '/',
                access: {requiredLogin: false}
            });
    }]);

	forgedditApp.controller('MyCtrl', function($scope) {
		console.log('Controller in app.js called');
		$scope.modalShown = false;
		$scope.toggleModal = function() {
		$scope.modalShown = !$scope.modalShown;
		};
	});
	
    forgedditApp.run(function($rootScope, $location, AuthTokenService) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if (nextRoute.access && nextRoute.access.requiredLogin && !AuthTokenService.isAuthenticated()) {
                $location.path("/");
            }
        });
    });
}());
/**
 * @brief Angular-controller for deleting an user
 *
 * @file admin_delete_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminDeleteUserCtrl', ['$scope', '$routeParams', '$location', 'UserDataService',
        function ($scope, $routeParams, $location, UserDataService) {


            //=====================================================================
            // private functions
            //=====================================================================
            function goToAdminListView() {
                $location.path('/admin/users');
            }

            function getUser() {
                var userName = $routeParams.username;
                UserDataService.getUser(userName)
                    .then(function (res) {
                        $scope.user = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function deleteAction(username) {
                UserDataService.deleteUserByName(username)
                    .then(function () {
                        console.log('  ok.');
                        goToAdminListView();
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function cancelAction(){
                goToAdminListView();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};

            $scope.deleteAction = deleteAction;
            $scope.cancelAction = cancelAction;

            getUser();

        }]);
}());
/**
 * @brief Angular-controller for editing an existing user
 *
 * @file admin_edit_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminEditUserCtrl', ['$scope', '$routeParams', '$location', 'UserDataService',
        function ($scope, $routeParams, $location, UserDataService) {


            //=====================================================================
            // private functions
            //=====================================================================
            function goBack() {
                if ($location.path().indexOf('/admin/users') === 0) {
                    $location.path('/admin/users');
                } else {
                    $location.path('/');
                }
            }

            function getUser() {
                var userName = $routeParams.username;
                UserDataService.getUser(userName)
                    .then(function (res) {
                        $scope.user = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            function submitAction() {
                $scope.userNameError = false;
                $scope.message = '';
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                if (user.password === '') {
                    delete user.password;
                }
                console.log('Update ', user.name);
                UserDataService.updateUser(user.name, user)
                    .success(function () {
                        goBack();
                    })
                    .error(function(status, data) {
                        $scope.userNameError = true;
                        $scope.message = status;
                    });
            }

            function cancelAction(){
                goBack();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.user.blocked = false;
            $scope.isEditMode = true;
            $scope.submitBtnLabel = 'Save';

            console.log('url: ' + $location.path());

            $scope.submitAction = submitAction;
            $scope.cancelAction = cancelAction;

            getUser();

        }]);
}());
/**
 * @brief Angular-controller for adding a new user
 *
 * @file admin_new_user_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminNewUserCtrl', ['$scope', '$location', 'UserDataService', 'UserService',
        function ($scope, $location, UserDataService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function goBack() {
                if ($location.path().indexOf('/admin/users') === 0) {
                    $location.path('/admin/users');
                } else {
                    if ($location.path().indexOf('/user/create') === 0) {
                        $location.path('/login');
                    }
                    else {
                        $location.path('/');
                    }
                }
            }

            function submitAction() {
                $scope.userNameError = false;
                $scope.message = '';
                var user = $scope.user;
                user.active = true;
                user.registrationDate = new Date().getTime();
                user.lastLoginDate = 0;
                UserDataService.addUser(user)
                    .success(function () {
                        goBack();
                    })
                    .error(function (data, status) {
                        $scope.userNameError = true;
                        $scope.message = data;
                    });
            }

            function cancelAction() {
                goBack();
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.user = {};
            $scope.user.role = 'User';
            $scope.user.blocked = false;
            $scope.isEditMode = false;
            $scope.userNameError = false;
            $scope.message = '';

            $scope.submitBtnLabel = 'Save';

            $scope.submitAction = submitAction;
            $scope.cancelAction = cancelAction;

        }]);
}());


/**
 * @brief Angular-controller for the user-list
 *
 * @file admin_user_list_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AdminUserListCtrl', ['$scope', 'UserDataService',
        function ($scope, UserDataService) {

            //=====================================================================
            // private functions
            //=====================================================================
            /**
             * @brief Gets all the users from the UserDataService
             */
            function getUsers() {
                UserDataService.getUsers()
                    .then(function (res) {
                        $scope.users = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });

            }

            //=====================================================================
            // Controller API
            //=====================================================================
            getUsers();
        }]);
}());
/**
* @brief Angular-controller for editing an existing user
*
* @file admin_edit_user_ctrl.js
* @author martin linggi
*/

(function() {
    'use strict';

    angular.module('forgedditApp').controller('AppCtrl', ['$scope', '$location', 'AuthTokenService', 'UserService',
        function ($scope, $location, AuthTokenService, UserService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function getSession(redirect) {
                UserService.getSessionData().then(function(response) {
                    console.dir(response.data);
                    $scope.isLogged = true;
                    $scope.message = '';
                    $scope.username = response.data.username;
                    $scope.hasAdminRights = response.data.role === 'Administrator';
                    AuthTokenService.setAuthenticated(true);
                    UserService.setUser(response.data.username, $scope.hasAdminRights);
                    if (redirect) {
                        $location.path('/');
                    }
                });
            }

            function login(username, password){
                if (username !== undefined && password !== undefined) {
                    UserService.login(username, password)
                        .success(function(data) {
                            AuthTokenService.setToken(data.token);
                            $scope.login.email = '';
                            $scope.login.password = '';
                            getSession(true);
                        })
                        .error(function(status, data){
                            console.log(status);
                            console.log(data);
                            $scope.message = status;
                        });
                    }
            }

            function logout() {
                UserService.logout();
                UserService.setUser('', false);
                AuthTokenService.setAuthenticated(false);
                $scope.isLogged = false;
                $scope.hasAdminRights = false;
                $scope.username = '';
                $location.path('/');
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.isLogged = false;
            $scope.hasAdminRights = false;
            $scope.username = '';
            $scope.message = '';
            $scope.login = login;
            $scope.logout = logout;
            getSession();
        }
    ]);

}());
/**
 * @brief Angular-controller for adding a new link
 *
 * @file link_add_ctrl.js
 * @author martin linggi
 */


(function() {
    'use strict';


    angular.module('forgedditApp').controller('addLinkController', ['$scope', 'ForgedditDataService', 'UserService', 'UtilityService',
        function ($scope, ForgedditDataService, UserService, UtilityService) {

            //=====================================================================
            // private functions
            //=====================================================================

            function sendLink() {
                var title = $scope.title;
                var url = $scope.url;
                UtilityService.isImage(url)
                    .then(function(isImage) {
                        var newLink = {
                            title: title,
                            url: url,
                            user: UserService.getUserName(),
                            isImage: isImage
                        };
                        ForgedditDataService.addLink(newLink)
                            .success(function (data) {
                                $scope.links.push(data);
                                $scope.title = '';
                                $scope.url = '';
                                console.log('Success: link added');
                            })
                            .error(function () {
                                console.log('Error: link not added');
// TODO Fix Error when send link does not work
                            });
                    });

            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.title = '';
            $scope.url = '';
            $scope.sendLink = sendLink;

        }]);

}());



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
				if($scope.showComments === true) {
					$scope.showComments = false;
					$scope.showAddComment = false;
					}
				else {
					$scope.showComments = true;
					$scope.showAddComment = true;
					}
            }

            function doEditStart() {
                $scope.isEdit = true;
                $scope.newTitle = $scope.link.title;
            }

            function doUpdateLink() {
                var linkId = $scope.link._id;
                var link = {
                    title: $scope.newTitle
                };
                ForgedditDataService.updateLink(linkId, link)
                    .success(function () {
                        $scope.link.title = $scope.newTitle;
                        console.log('Success: link updated');
                    })
                    .error(function () {
                        console.log('Error: link not updated');
// TODO Fix Error when send link does not work
                    });
            }

            function doDeleteLink() {
                var linkId = $scope.link._id;
                ForgedditDataService.deleteLink(linkId)
                    .success(function() {
                        for (var i = 0, n = $scope.links.length; i < n; i++) {
                            if ($scope.links[i]._id === linkId) {
                                $scope.links.splice(i, 1);
                                break;
                            }
                        }
                    })
                    .error(function() {
                        console.log('Error: Link not deleted');
                    });
            }




            //=====================================================================
            // Controller API
            //=====================================================================


            $scope.canDelete = $scope.link.user === UserService.getUserName() || UserService.isAdmin();
            $scope.isEdit = false;
            $scope.canEdit = $scope.link.user === UserService.getUserName();
            $scope.newTitle = $scope.link.title;
            $scope.toggleComments = toggleComments;
            $scope.doEditStart = doEditStart;
            $scope.doUpdateLink = doUpdateLink;
            $scope.doDeleteLink = doDeleteLink;

        }]);

}());

/**
* @brief Angular-controller for showing the link-list
*
* @file link_list_ctrl.js
* @author martin linggi
*/

(function() {
    'use strict';


    angular.module('forgedditApp').controller('LinkListCtrl', ['$scope', 'ForgedditDataService', 'UtilityService', 'AuthTokenService', 'UserService', 'SocketService',
        function ($scope, ForgedditDataService, UtilityService, AuthTokenService, UserService, SocketService) {

            //=====================================================================
            // private functions
            //=====================================================================

            /**
             * @brief Calculates a duration from now to a given timestamp
             * @param time timestamp when something happened
             * @returns {*} String (duration)
             */
            function getTimeAgo(time) {
                return UtilityService.getDuration(time);
            }

            function refresh() {
                if ($scope.newLinks.length > 0) {
                    for (var i = 0, n = $scope.newLinks.length; i < n; i++) {
                        $scope.links.push($scope.newLinks[i]);
                    }
                    $scope.newLinks = [];
                }
            }

            /**
             * @brief Sets the predicate and sort-order for the list
             * @param searchPredicate name of the attribute to sort
             * @param reverse sort-order
             */
            function sort(sortPredicate, reverse) {
                $scope.sortPredicate = sortPredicate;
                $scope.reverse = reverse;
                refresh();
            }

            /**
             * @brief Filter: Only Forgeddables which the user had commented
             * @param link fordeddable to check
             * @returns {boolean} true: is valid
             */
            function filterMyCommnentedForgeddables(link) {
                for (var i = 0, n = link.comments.length; i < n; i++) {
                    if (link.comments[i].user === UserService.getUserName()) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * @brief Filter: Only Forgeddables which the user had voted
             * @param link fordeddable to check
             * @returns {boolean} true: is valid
             */
            function filterMyVotedForgeddables(link) {
                for (var i = 0, n = $scope.alreadyVoteList.length; i < n; i++) {
                    if ($scope.alreadyVoteList[i].linkId === link._id) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * @brief Sets the filter expression
             * @param filterPredicate
             */
            function filter(filterPredicate) {
                var expression;
                if (filterPredicate === 'user') {
                    expression = {};
                    expression.user = UserService.getUserName();
                }
                else if (filterPredicate === 'commented') {
                    expression = filterMyCommnentedForgeddables;
                }
                else if (filterPredicate === 'voted') {
                    expression = filterMyVotedForgeddables;
                }
                $scope.filterExpression = expression;
                $scope.filterPredicate = filterPredicate;
                refresh();
            }

            /**
             * @brief Gets all the forgeddables from the data-service
             */
            function getLinks() {
                ForgedditDataService.getLinks()
                    .then(function (res) {
                        $scope.links = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            /**
             * @brief Gets all the votes for the user (if logged in) from the data-service
             */
            function getVotes() {
                var userName = UserService.getUserName();
                ForgedditDataService.getVotes(userName)
                    .then(function (res) {
                        $scope.alreadyVoteList = res.data;
                    }, function (error) {
                        console.log('An error occured!', error);
                    });
            }

            /**
             * @brief Socket-Update: Changed link
             * @param id the id of the changed link
             */
            function updateLink(id) {
                ForgedditDataService.getLink(id)
                    .then(function (res) {
                        for (var i = 0, n = $scope.links.length; i < n; i++) {
                            if ($scope.links[i]._id === id){
                                $scope.links[i] = res.data;
                            }
                        }
                    });
            }

            /**
             * @brief Socket-Update: New Link
             * @param aLink the new link
             */
            function newLink(aLink) {
                // only add if not already exists
                for (var i = 0, n = $scope.links.length; i < n; i++)
                {
                    if (aLink._id === $scope.links[i]._id)
                    {
                        return;
                    }
                }
                $scope.newLinks.push(aLink);
            }

            //=====================================================================
            // Controller API
            //=====================================================================
            $scope.getTimeAgo = getTimeAgo;
            $scope.sort = sort;
            $scope.filter = filter;
            $scope.refresh = refresh;
            $scope.links = [];
            $scope.alreadyVoteList = [];
            $scope.newLinks = [];
            sort('time', true);
            getVotes();
            filter('');
            getLinks();
            SocketService.on('updateLink', updateLink);
            SocketService.on('newLink', newLink);
        }]);

}());
/**
 * @brief Angular-controller for voting a link
 *
 * @file link_vote_ctrl.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').controller('LinkVoteCtrl', ['$scope', 'ForgedditDataService',
        function ($scope, ForgedditDataService) {

            //=====================================================================
            // private functions
            //=====================================================================

            /**
             * @brief Vote-Action
             * @param link
             * @param value
             */
            function voteAction(value) {
                var id = $scope.link._id;
                var userName = $scope.username;
                ForgedditDataService.voteLink(id, userName, value)
                    .success(function () {
                        $scope.link.rate += value;
                        var index = getAlreadyVotedIndex(-value);
                        if (index > -1) {
                            $scope.alreadyVoteList.splice(index,1);
                        }
                        else {
                            $scope.alreadyVoteList.push({linkId:id, vote:value});
                        }
                        refreshVoteArrows();
                    })
                    .error(function (data, status) {
                        console.log('An error occured!', status, data);
                    });
            }

            /**
             * @brief Refreshes the Flags for the UI-Indication of the Arrows
             */
            function refreshVoteArrows() {
                $scope.isVoteUpActive = getAlreadyVotedIndex(1) === -1;
                $scope.isVoteDownActive = getAlreadyVotedIndex(-1) === -1;
            }

            /**
             * @brief Checks if the user has already voted this link (up or down)
             *
             * If the user has already voted the link a non negative number is returned, otherwise -1.
             * The number is th index of the entry in the 'already-voted' list
             *
             * @param value 1=vote up, -1=vote down
             * @returns {number} index of the 'already-voted'-entry in the list
             */
            function getAlreadyVotedIndex(value) {
                for (var i = 0, n = $scope.alreadyVoteList.length; i < n; i++) {
                    if ($scope.alreadyVoteList[i].linkId === $scope.link._id && $scope.alreadyVoteList[i].vote === value) {
                        console.log('Vote disabled: ' + $scope.link._id + ': ' + $scope.link.title + ' value: ' + value);
                        return i;
                    }
                }
                return -1;
            }

            //=====================================================================
            // Controller API
            //=====================================================================

            $scope.isVoteUpActive = false;
            $scope.isVoteDownActive = false;
            $scope.$watch(function(scope) {return $scope.alreadyVoteList;}, refreshVoteArrows());
            $scope.voteAction = voteAction;
        }]);

}());

/**
 * @brief Angular-directive for the user-list
 *
 * @file admin_user_list.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('userListView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================
        return {
            restrict: 'E',
            templateUrl: 'templates/admin/user_list_view.html',
            controller: 'AdminUserListCtrl'
        };
    });

}());
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


/**
 * @brief Angular-directive for the footer template
 *
 * @file footer.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('footerDiv', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/footer.html'

        };
    });

}());

/**
 * @brief Angular-directive for the header template
 *
 * @file header.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('headerDiv', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/header.html'

        };
    });

}());

/**
 * @brief Angular-directive for the add-link-formular
 *
 * @file link_add.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkAddView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================
        return {
            restrict: 'E',
            templateUrl: 'templates/link_add_view.html',
            controller: 'addLinkController'
        };
    });

}());
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
/**
 * @brief Angular-directive for the link-content
 *
 * @file link_content.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkContentView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/link_content_view.html',
			controller: 'LinkContentCtrl'
        };
    });

}());
/**
 * @brief Angular-directive for the link-list
 *
 * @file link_list.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkListView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================
        return {
            restrict: 'E',
            templateUrl: 'templates/link_list_view.html',
            controller: 'LinkListCtrl'
        };
    });

}());
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
/**
 * @brief Angular-directive for the vote-link template
 *
 * @file link_votes.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').directive('linkVoteView', function () {

        //=====================================================================
        // Directive API
        //=====================================================================

        return {
            restrict: 'E',
            templateUrl: 'templates/link_vote_view.html',
            controller: 'LinkVoteCtrl'

        };
    });

}());
//app.directive('modalDialog', function() {
  angular.module('forgedditApp').directive('modalDialog', function () {
  console.log('Overlay directive called');
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'templates/modal_dialog.html'
  };
});
/**
 * @brief Angular-Service for the authentication token management
 *
 * @file auth_token_service.js
 * @author martin linggi
 */


(function(){
    'use strict';

    angular.module('forgedditApp').factory('AuthTokenService', ['$window', function ($window) {

        //=====================================================================
        // private variables
        //=====================================================================

        var _store = $window.localStorage;
        var _key = 'auth-token';
        var _isAuth;

        //=====================================================================
        // private functions
        //=====================================================================
        function getToken() {
            return _store.getItem(_key);
        }

        function setToken(token) {
            if (token) {
                _store.setItem(_key, token);
            } else {
                _store.removeItem(_key);
            }
        }

        function isAuthenticated()
        {
            return _isAuth;
        }

        function setAuthenticated(state)
        {
            _isAuth = state;
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getToken: getToken,
            setToken: setToken,
            isAuthenticated: isAuthenticated,
            setAuthenticated: setAuthenticated
        };

    }]);
}());


/**
 * @brief Angular-Service for the REST-API of the link data
 *
 * @file forgeddit_data_service.js
 * @author martin linggi
 */


(function() {
    'use strict';

    angular.module('forgedditApp').factory('ForgedditDataService', ['$http', function ($http) {

        //=====================================================================
        // private functions
        //=====================================================================
        function getLinks() {
            return $http.get('/api/links');
        }

        function getLink(id) {
            return $http.get('/api/links/' + id);
        }

        function getVotes(userName) {
            return $http.get('/api/votes/' + userName);
        }

        function addLink(newLink) {
            return $http.post('/api/links', newLink);
        }

        function updateLink(id, linkData) {
            return $http.put('/api/links/' + id, linkData);
        }

        function deleteLink(id) {
            return $http.delete('api/links/' + id);
        }

        function voteLink(id, userName, value) {
            return $http.put('/api/links/' + id + '/vote', {value: value, userName: userName});
        }
		
		function addComment(id, newComment) {
            return $http.post('/api/links/' + id + '/comments', newComment);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getLinks: getLinks,
            getLink: getLink,
            getVotes: getVotes,
            addLink: addLink,
            updateLink: updateLink,
            deleteLink: deleteLink,
            voteLink: voteLink,
			addComment: addComment
        };

    }]);

}());
/**
 * @brief Angular-Service for the socket io updates
 *
 * @file socket_service.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').factory('SocketService', ['$rootScope', function ($rootScope) {

        //=====================================================================
        // private variables
        //=====================================================================
        var socket = io.connect();

        //=====================================================================
        // private functions
        //=====================================================================
        function on(eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function emit(eventName, data, callback) {
            if (typeof data == 'function') {
                callback = data;
                data = {};
            }
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }

        function emitAndListen(eventName, data, callback) {
            emit(eventName, data, callback);
            on(eventName, callback);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            on: on,
            emit: emit,
            emitAndListen: emitAndListen
        };
    }]);
}());
/**
 * @brief Angular-Service injects the authentication token into the header of the requests
 *
 * @file token_interceptor.js
 * @author martin linggi
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('TokenInterceptor', ['$q', '$location', 'AuthTokenService',
        function ($q, $location, AuthTokenService) {

        //=====================================================================
        // private functions
        //=====================================================================
        function request(config) {
            config.headers = config.headers || {};
            var token = AuthTokenService.getToken();
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        function response(res) {
            if (res !== null && res.status === 200 && AuthTokenService.getToken() && !AuthTokenService.isAuthenticated()) {
                AuthTokenService.setAuthenticated(true);
            }
            return res || $q.when(res);
        }

        function responseError(rejection) {
            if (rejection !== null && rejection.status === 401 && AuthTokenService.getToken() && AuthTokenService.isAuthenticated()) {
                AuthTokenService.setToken();
                AuthTokenService.setAuthenticated(false);
                $location.path('/');
            }
            return $q.reject(rejection);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };
    }]);
}());
/**
 * @brief Angular-Service for the REST API of the user data
 *
 * @file user_data_service.js
 * @author martin linggi
 */
(function() {
    'use strict';


    angular.module('forgedditApp').factory('UserDataService', ['$http', function ($http) {

        //=====================================================================
        // private functions
        //=====================================================================
        function getUsers() {
            return $http.get('/api/users');
        }

        function getUser(userName) {
            console.log('GET user: ', userName);
            return $http.get('/api/users/' + userName);
        }

        function addUser(newUser) {
            console.log('POST new user: ', newUser);
            return $http.post('/api/users', newUser);
        }

        function updateUser(username, user) {
            return $http.put('/api/users/' + username, user);
        }

        function deleteUserByName(username) {
            return $http.delete('/api/users/' + username);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getUsers: getUsers,
            getUser: getUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUserByName: deleteUserByName
        };

    }]);

}());
/**
 * @brief Angular-Service for the login and logout of the user
 *
 * @file user_service.js
 * @author martin linggi
 */
(function() {
    'use strict';

    angular.module('forgedditApp').factory('UserService', ['$http', '$q', 'AuthTokenService', function ($http, $q, AuthTokenService) {

        var _userName = "";
        var _isAdmin = false;


        //=====================================================================
        // private functions
        //=====================================================================
        function login(username, password) {
            return $http.post('/api/users/login', {username: username, password: password});
        }

        function logout() {
            AuthTokenService.setToken();
            AuthTokenService.setAuthenticated(false);
        }

        function getSessionData() {
            if (AuthTokenService.getToken()) {
                return $http.get('/api/users/me');
            } else {
                return $q.reject({ data: 'client has no auth token' });
            }
        }

        function setUser(userName, isAdmin){
            _userName = userName;
            _isAdmin = isAdmin;
        }

        function getUserName() {
            return _userName;
        }

        function isAdmin() {
            return _isAdmin;
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            login: login,
            logout: logout,
            getSessionData: getSessionData,
            setUser: setUser,
            getUserName: getUserName,
            isAdmin: isAdmin

        };

    }]);

}());
/**
 * @brief Angular-Service for the utility-functions
 *
 * @file utility_service.js
 * @author martin linggi
 */


(function() {
    'use strict';

    angular.module('forgedditApp').factory('UtilityService', ['$q', function ($q) {

        //=====================================================================
        // private functions
        //=====================================================================

        /**
         * @brief Checks if the url is an image
         * @param src
         * @returns {*} the promise
         */

        function isImage(src) {
            var deferred = $q.defer();

            var image = new Image();
            image.onerror = function() {
                deferred.resolve(false);
            };
            image.onload = function() {
                deferred.resolve(true);
            };
            image.src = src;

            return deferred.promise;
        }

        /**
         * @brief Calculates the duration between now and a given date
         * @param time the given date
         * @returns {string} the duration in seconds, minutes, hours, days, weeks, months or years
         */
        function getDuration(time) {
            var millis = new Date().getTime() - time;
            var oneSec = 1000;
            var oneMin = oneSec * 60;
            var oneHour = oneMin * 60;
            var oneDay = oneHour * 24;
            var oneWeek = oneDay * 7;
            var oneMonth = oneDay * 31;
            var oneYear = oneDay * 365;
            if (millis < oneSec) {
                return 'just now';
            }
            else if (millis < 10 * oneSec) {  // 1 second steps
                return Math.round(millis / oneSec) + ' seconds ago';
            }
            else if (millis < oneMin) {  //  10 seconds steps
                return Math.round(millis / (oneSec * 10)) * 10 + ' seconds ago';
            }
            else if (millis < oneMin * 10) {  // 1 minute steps
                return Math.round(millis / oneMin) + ' minutes ago';
            }
            else if (millis < oneHour) {  // 10 minute steps
                return Math.round(millis / (10 * oneMin)) * 10 + ' minutes ago';
            }
            else if (millis < oneDay) {  // 1 hour steps
                return Math.round(millis / oneHour) + ' hours ago';
            }
            else if (millis < oneWeek) {  //  1 day steps
                return Math.round(millis / oneDay) + ' days ago';
            }
            else if (millis < oneMonth) {  //  1 week steps
                return Math.round(millis / oneWeek) + ' weeks ago';
            }
            else if (millis < oneYear) {  //  1 month steps
                return Math.round(millis / oneMonth) + ' months ago';
            }
            else {  // 1 year steps
                return Math.round(millis / oneYear) + ' years ago';
            }
        }


        //=====================================================================
        // Service API
        //=====================================================================
        return {
            isImage: isImage,
            getDuration: getDuration
        };

    }]);

}());

/**
 * @brief Angular-Service for the REST-API of the vote data
 *
 * @file vote_data_service.js
 * @author martin linggi
 */


(function() {
    'use strict';

    angular.module('forgedditApp').factory('VoteDataService', ['$http', function ($http) {

        //=====================================================================
        // private functions
        //=====================================================================
        function getVotesByUserName(userName) {
            return $http.get('/api/votes/' + userName);
        }

        function addLink(newLink) {
            return $http.post('/api/links', newLink);
        }

        function voteLink(id, value) {
            return $http.put('/api/links/' + id + '/vote', {value: value});
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            getLinks: getVotesByUserName,
            addLink: addLink,
            voteLink: voteLink
        };

    }]);

}());
//# sourceMappingURL=forgeddit.js.map
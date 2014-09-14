/**
 * Created by martinlinggi on 01.09.14.
 */

var app = angular.module('forgedditApp', []);

var linkList;

/**
 * Creates a text in the form "<time>-ago" from the given creation time
 * @param creationTime The creation time
 * @returns {string}
 */
function getTimeAgo(time)
{
    var millis = new Date().getTime() - time;
    var oneSec = 1000;
    var oneMin = oneSec*60;
    var oneHour = oneMin*60;
    var oneDay = oneHour*24;
    var oneWeek = oneDay*7;
    var oneMonth = oneDay*31;
    var oneYear = oneDay*365;
    if (millis < oneSec) {
        return 'just now';
    }
    else if (millis < 10 * oneSec) {  // 1 second steps
        return Math.round(millis / oneSec) + ' seconds ago';
    }
    else if (millis < oneMin) {  //  10 seconds steps
        return Math.round(millis / (oneSec * 10) ) * 10 + ' seconds ago';
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

app.controller('linkController', ['$scope', '$http', function($scope, $http) {

    $scope.showCommentsIndex = -1;
    $scope.predicate = 'time';
    $scope.reverse = true;

    $scope.getTimeAgo = function(time) {
        return getTimeAgo(time);
    };

    // Gets all the links from the api
    $http.get('api').
        success(function(data, status, headers, config){
            linkList = data;
            $scope.links = linkList;
            console.log('success: ' + $scope.links);
        }).
        error(function(data, status, header, config){
            console.log('error: ' + status);
// TODO Fix Error when send link does not work
        });

    // Sort the link list
    $scope.sort = function(predicate, reverse) {
        $scope.predicate = predicate;
        $scope.reverse = reverse;
        console.log('sort: ' + predicate + ' ' + reverse);
    };

}]);

app.directive('linkView', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/link-view.html'
    };
});


app.controller('addLinkController', ['$scope', '$http', function($scope, $http) {
    $scope.title = "";
    $scope.url = "";
    $scope.sendLink = function() {
        console.log("send clicked");
        var dataObject = {
            title: $scope.title,
            url: $scope.url,
            user: 'testuser'
        };
        $http.post('/api/links', dataObject)
            .success(function (data, status, headers, config) {
                console.log('Success: link added');
                linkList.push(data);
            })
            .error(function (data, status, headers, config) {
                console.log('Error: link not added');
// TODO Fix Error when send link does not work
            });
    };

}]);

app.directive('sendLinkView', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/send-link-view.html'
    };
});

app.controller('linkContentController', ['$scope', '$http', function($scope, $http) {

    $scope.newComment = "";
    $scope.toggleComments = function(link)
    {
        $scope.showComments = !$scope.showComments;
    };

    $scope.sendComment = function(link)
    {
        console.log('Send Comment:');
        var dataObject = {
            text: $scope.newComment,
            user: 'testuser',
            time: new Date().getTime()
        };
        $http.post('/api/links/' + link._id + "/comments", dataObject)
            .success(function (data, status, headers, config) {
                link.comments.push(dataObject);
                console.log('Success: Send Comment');
                $scope.newComment = "";
            })
            .error(function (data, status, headers, config) {
                console.log('Error: send Comment');
// TODO Fix Error when send link does not work
            });
    }

}]);

app.controller('linkVoteController', ['$scope', '$http', function($scope, $http) {
    $scope.hasAlreadyVoted = false;
    $scope.vote = function(link, vote) {

        if ($scope.hasAlreadyVoted === false)
        {
            console.log("Can Vote");
            var dataObject = {
                vote: vote
            };
            $http.put('/api/links/' + link._id, dataObject)
                .success(function (data, status, headers, config) {
                    link.rate += vote;
                    $scope.hasAlreadyVoted = true;
                    console.log('Success: Voting accepted');
                })
                .error(function (data, status, headers, config) {
                    console.log('Error: Voting failed');
// TODO Fix Error when send link does not work
                });
        }
        else
        {
            console.log("Can't Vote");
        }
    };
}]);

app.directive('linkVoteView', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/link-vote-view.html'
    };
});

app.directive('linkThumbView', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/link-thumb-view.html'
    };
});

app.directive('linkContentView', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/link-content-view.html'
    };
});

/**
 * Created by martinlinggi on 01.09.14.
 */

var app = angular.module('forgedditApp', []);

var linkList;

app.controller('LinkController', ['$scope', '$http', function($scope, $http) {

    $scope.showCommentsIndex = -1;
    $scope.predicate = 'time';
    $scope.reverse = true;

    // Gets all the links from the api
    $http.get('api').
        success(function(data, status, headers, config){
            linkList = data;
            $scope.links = linkList;
            console.log('success: ' + $scope.links);
        }).
        error(function(data, status, header, config){
            console.log('error: ' + status);

        });

    // Sort the link list
    $scope.sort = function(predicate, reverse) {
        $scope.predicate = predicate;
        $scope.reverse = reverse;
        console.log('sort: ' + predicate + ' ' + reverse);
    };


    $scope.setShowCommentsIndex = function (index) {
        if (this.links[index].comments.length === 0)
        {
            return;
        }
        else if ($scope.showCommentsIndex === index) {
            $scope.showCommentsIndex = -1;
        }
        else {
            $scope.showCommentsIndex = index;
        }
    };

    $scope.isShowComments = function (index) {
        return $scope.showCommentsIndex === index;
    };
}]);

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



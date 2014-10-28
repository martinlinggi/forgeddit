/**
 * Created by ma-li on 23.10.14.
 */

forgedditApp.controller('addLinkController', ['$scope', 'ForgedditDataService', function($scope, ForgedditDataService) {
    $scope.title = "";
    $scope.url = "";
    $scope.sendLink = function() {
        console.log("send clicked");
        var newLink = {
            title: $scope.title,
            url: $scope.url,
            user: 'testuser'
        };
        ForgedditDataService.addLink(newLink)
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



/**
 * Created by martinlinggi on 01.09.14.
 */

//(function() {

var app = angular.module('forgedditApp', [])
    .controller('LinkController', ['$scope', '$http', function($scope, $http) {
        $http.get('api').
            success(function(data, status, headers, config){
                $scope.links = data;
                console.log('success: ' + $scope.links);
            }).
            error(function(data, status, header, config){
                console.log('error: ' + status);

            });

//       this.links = linkList;
        $scope.showCommentsIndex = -1;
        $scope.testdata="Hello Test";

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
        }
    }])
    .controller('addLinkController', ['$scope', '$http', function($scope, $http){

        $scope.form = {};
        $scope.form.title = "";
        $scope.form.url = "";
        $scope.form.submitLink = function(item, event) {
            var dataObject = {};
            dataObject.title = $scope.form.title;
            dataObject.url = $scope.form.url;
            dataObject.user = 'testuser';
            $http.post('/links', dataObject)
                .success(function (data, status, headers, config) {
                    console.log('Success: link added')

                })
                .error(function (data, status, headers, config) {
                    console.log('Error: link not added')

                });
        }
    }]);

//   app.directive('entryPartial', function() {
//       return {
//           restrict: 'E',
//           templateUrl: 'link-list-partial.html'
//       };
//   });

//})();


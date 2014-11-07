/**
 * Created by martinlinggi on 31.10.14.
 */

forgedditApp.controller('AdminNewUserCtrl', ['$scope', '$location', 'UserDataService', function($scope, $location, UserDataService) {
    $scope.user = {};
    $scope.user.role = 'User';
    $scope.isUniqueUserName = true;

    $scope.submitBtnLabel = 'Save';

    $scope.checkUser = function() {
        UserDataService.getUser($scope.user.name).then(function(res) {
//            console.log('check name', res.data);
            $scope.isUniqueUserName = res.data;
        }, function() {
            $scope.isUniqueUserName = true;
        });
    };

    $scope.submitAction = function() {
        var user = $scope.user;
        user.active = true;
        user.registration_date = new Date().getTime();
        user.last_login_date = 0;
        UserDataService.addUser(user)
            .then(function() {
                goToAdminListView();
            }, function(error) {
                console.log('An error occured!', error);
            });
    };

    $scope.cancelAction = function() {
        goToAdminListView();
    };

    var goToAdminListView = function() {
        $location.path('/admin/users');
    }
}]);
angular.module('pdm').controller('pdmAuthorizationsCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/v1/identity/' + getIdentityId() + '/authorizations').then(function(response) {
        $scope.authorizations = response.data.authorizations;
    });

    // Global functionality
    $scope.resetStubs = resetStubs;
}]);

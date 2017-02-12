angular.module('pdm').controller('pdmRequestDataCtrl', ['$scope', '$http', function($scope, $http) {

    // Global functionality
    $scope.resetStubs = resetStubs;

    $http.get('/api/v1/fields').then(function(response) {
            $scope.fields = response.data.fields;
    });

    $scope.requestData = function() {
        var requestFields = [];

        $scope.fields.forEach(function(field) {
                if (field.request) {
                    requestFields.push(field);
                }
        }, this);

        var request = {
            askIdentityId: getIdentityId(),
            targetIdentityId: getTargetIdentityId(),
            requestFields: requestFields
        }

        $http.post('/api/v1/requests', request).then(function(response) {
            $scope.requestSuccess = true;
        });
    }
}]);

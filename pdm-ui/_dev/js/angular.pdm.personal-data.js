angular.module('pdm').controller('pdmPersonalDataCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.editMode = false;

    $http.get('/api/v1/identity/' + identityId + '/attributes').then(function(response) {
		$scope.attributes = response.data.attributes;
	});

    $scope.toggleEditMode = function() {
        $scope.editMode = !$scope.editMode;
    }

    $scope.savePersonalDetails = function() {
        // TODO save
        $scope.editMode = false;
    }
}]);
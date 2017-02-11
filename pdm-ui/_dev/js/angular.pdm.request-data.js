angular.module('pdm').controller('pdmRequestDataCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.attributes = null;
    $scope.editMode = false;
    $scope.attributesToShare = [];

    $http.get('/global/stubs/get-attributes.json').then(function(response) {
		$scope.attributes = response.data;
	});

    $scope.toggleEditMode = function() {
        console.log('toggle!');
        $scope.editMode = !$scope.editMode;
    }

    $scope.savePersonalDetails = function() {
        console.log($scope.attributes)
        $scope.editMode = false;
    }

    $scope.updateAttributesToShare = function(attribute) {
        console.log(attribute);
    }

}]);
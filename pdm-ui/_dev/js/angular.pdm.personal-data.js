angular.module('pdm').controller('pdmPersonalDataCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.attributes = null;
    $scope.editMode = false;
    $scope.attributesToShare = [];

    $http.get('/api/v1/identity/' + identityId + '/attributes').then(function(response) {
		$scope.attributes = response.data.attributes;
	});

    $scope.toggleEditMode = function() {
        console.log('toggle!');
        $scope.editMode = !$scope.editMode;
    }

    $scope.savePersonalDetails = function() {
        console.log($scope.attributes)
        $scope.editMode = false;
    }

    $scope.shareAttribute = function(attribute) {
        console.log(attribute);
    }

}]);
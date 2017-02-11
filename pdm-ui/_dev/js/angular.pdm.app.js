var app = angular.module('pdm', []);

var identityId = "12345"

// Global functionality
function resetStubs() {
    var $http = angular.injector(["ng"]).get("$http");
    $http.post('/api/v1/stubs/reset').then(function() {
        location.reload();
    });
}

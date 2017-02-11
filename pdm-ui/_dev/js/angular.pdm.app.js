var app = angular.module('pdm', []);

// Initialize PDM state from sessionStorage
if (!sessionStorage.getItem('PDM-IdentityId')) {
    var identityId = prompt('Identity ID:', '1');
    var targetIdentityId = prompt('Target Identity ID:', '2');

    sessionStorage.setItem('PDM-IdentityId', identityId);
    sessionStorage.setItem('PDM-TargetIdentityId', targetIdentityId);
}

// Prototype styling
document.body.className += ' identity-' + getIdentityId();

// Global functionality
function getIdentityId() {
    return sessionStorage.getItem('PDM-IdentityId');
}

function getTargetIdentityId() {
    return sessionStorage.getItem('PDM-TargetIdentityId');
}

function resetStubs() {
    var $http = angular.injector(["ng"]).get("$http");
    $http.post('/api/v1/stubs/reset').then(function() {
        location.reload();
    });
}

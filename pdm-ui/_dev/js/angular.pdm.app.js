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

// Start websocket connection to listen for events
var ws = new WebSocket('ws://localhost:3000/api/v1/identity/' + getIdentityId() + '/events');
ws.addEventListener('message', function(msg) {
    console.log(msg);
    var eventName = msg.data;
    console.log('Incoming event: ' + eventName);
    switch (eventName) {
        case 'AuthorizationCreated':
            updateAuthorizationCount();
            break;
        case 'RequestCreated':
            alertify
                .okBtn("Accept")
                .cancelBtn("Deny")
                .confirm("Message with<ul><li>test</li></ul>", function (ev) {
                    // TODO do http request
                    console.log('accepted!');
                }, function (ev) {

                });

            break;
        default:
            throw new Error('Unsupported event: ' + eventName);
    }
});

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

function updateAuthorizationCount() {
    var $http = angular.injector(["ng"]).get("$http");
    $http.get('/api/v1/identity/' + getIdentityId() + '/authorizations').then(function(response) {
        var numAuth = response.data.authorizations.length;
        document.getElementById('authCount').innerHTML = numAuth;
    });
}

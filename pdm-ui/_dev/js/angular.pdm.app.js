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
            handleRequestCreated();
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
    getHttpClient().post('/api/v1/stubs/reset').then(function() {
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

function handleRequestCreated() {
    getHttpClient().get("/api/v1/identity/" + getIdentityId() + "/requests").then(function(response) {
        var requests = response.data.requests;
        var request = requests[0];

        var message = request.askIdentity.description + " asks permission to receive the following information:<br><ul>";

        request.requestFields.forEach(function(field) {
            message += "<li>" + field.field.caption + "</li>";
        }, this);

        message += "</ul>";

        alertify
            .okBtn("Accept")
            .cancelBtn("Deny")
            .confirm(message, function (ev) {
                confirmRequestAuthorization(request.requestId);
            });
    });
}

function confirmRequestAuthorization(requestId) {
    getHttpClient().post('/api/v1/identity/' + getIdentityId() + '/requests/' + requestId + '/confirm').then(function(response) {
        console.log('Yay!');
    });
}

function getHttpClient() {
    return angular.injector(["ng"]).get("$http");
}
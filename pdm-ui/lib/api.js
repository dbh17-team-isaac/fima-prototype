let FIMA = require('./fima.js');

String.prototype.hexEncode = function() {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result;
};

/**
 * PDM API endpoint implementations.
 */
module.exports = function(app, wsApp, web3, contractsRegistry) {
    var stubs = require('./api-stubs.js');
    var wsByIdentity = {};

    // Websocket send helper
    function sendWS(identityId, msg) {
        identityId += '';

        if (identityId in wsByIdentity) {
            console.log('Notifying identity ' + identityId + ' via WS');
            wsByIdentity[identityId].send(msg);
        }
    }

    // Send anti-caching headers for all API endpoints
    app.get('/api/v1/*', function(req, res, next) {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        next();
    });

    // API: retrieve available fields
    app.get('/api/v1/fields', function(req, res) {
        var response = stubs.getFields();
        res.json(response);
    });

    // API: retrieve identity attributes
    app.get('/api/v1/identity/:identityId/attributes', function(req, res) {
        var identityId = req.params.identityId;

        var response = stubs.getAttributesForIdentity(identityId);

        res.json(response);
    });

    // API: retrieve identity authorizations
    app.get('/api/v1/identity/:identityId/authorizations', function(req, res) {
        var identityId = req.params.identityId;

        var response = stubs.getAuthorizationsForIdentity(identityId);

        res.json(response);
    });

    // API: events websocket
    wsApp.ws('/api/v1/identity/:identityId/events', function(ws, req) {
        var identityId = req.params.identityId + '';
        console.log('New webservice connection for identity: ' + identityId);
        wsByIdentity[identityId] = ws;
    });

    // API: retrieve identity requests
    app.get('/api/v1/identity/:identityId/requests', function(req, res) {
        var identityId = req.params.identityId;

        var response = stubs.getRequestsForIdentity(identityId);

        res.json(response);
    });

    // API: confirm request
    app.post('/api/v1/identity/:identityId/requests/:requestId/confirm', function(req, res) {
        var identityId = req.params.identityId;
        var requestId = req.params.requestId;

        var response = stubs.confirmRequest(identityId, requestId);
        
        // Put the authorization on the blockchain
        var identityAddress = "0x0067af5b87da32b14ff58af203cf3d4684319c5c";
        var fima = new FIMA(identityAddress, web3);
        var authContract = fima.getAuthorizationTrackerContract(contractsRegistry.authorizationTracker.address);

        var granter = "0x" + (identityId + '').hexEncode();
        var grantee = "0x1234abcd";
        var subsnapID = "0xabcd1234";

        authContract.authorize(granter, grantee, subsnapID);

        // Notify the asker
        var request = stubs.getRequestById(requestId);
        sendWS(request.askIdentity.identityId, 'AuthorizationCreated');

        res.json(response);
    });

    // API: create request for authorization
    app.post('/api/v1/requests', function(req, res) {
        var askIdentityId = req.body.askIdentityId;
        var targetIdentityId = req.body.targetIdentityId;
        var requestFields = req.body.requestFields;

        var response = stubs.createRequest(askIdentityId, targetIdentityId, requestFields);
        
        // Notify target
        sendWS(targetIdentityId, 'RequestCreated');

        res.json(response);
    });

    // API: reset prototype scenario state
    app.post('/api/v1/stubs/reset', function(req, res) {
        var response = stubs.reset();
        res.json(response);
    });
};

/**
 * PDM API endpoint implementations.
 */
module.exports = function(app) {
    var stubs = require('./api-stubs.js');

    // API: retrieve identity attributes
    app.get('/api/v1/identity/:identityId/attributes', function(req, res) {
        var identityId = req.params.identityId;

        var response = stubs.getAttributesForIdentity(identityId);

        res.json(response);
    });

    // API: retrieve identity authorizations
    app.get('/api/v1/identity/:identityId/authorization', function(req, res) {
        var identityId = req.params.identityId;
        
        var response = stubs.getAuthorizationsForIdentity(identityId);
        
        res.json(response);
    });

    // API: retrieve identity requests
    app.get('/api/v1/identity/:identityId/request', function(req, res) {
        var identityId = req.params.identityId;
        
        var response = stubs.getRequestsForIdentity(identityId);
        
        res.json(response);
    });

    // API: confirm request
    app.post('/api/v1/identity/:identityId/request/:requestId', function(req, res) {
        var identityId = req.params.identityId;
        var requestId = req.params.requestId;

        var response = stubs.confirmRequest(identityId, requestId);

        res.json(response);
    });

    // API: request authorization
    app.post('/api/v1/request', function(req, res) {
        // askIdentityId
        // targetIdentityId
        // requestFields
        console.log(req.body);
        
        var response = stubs.createRequest(null, null, null);
        
        res.json(response);
    });
};
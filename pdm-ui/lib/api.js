/**
 * PDM API endpoint implementations.
 */
module.exports = function(app, wsApp) {
    var stubs = require('./api-stubs.js');
    
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
        var identityId = req.params.identityId;
        ws.on('message', function(msg) {
            ws.send(msg + ' response!');
        });
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

        res.json(response);
    });

    // API: create request for authorization
    app.post('/api/v1/requests', function(req, res) {
        var askIdentityId = req.body.askIdentityId;
        var targetIdentityId = req.body.targetIdentityId;
        var requestFields = req.body.requestFields;
        
        var response = stubs.createRequest(askIdentityId, targetIdentityId, requestFields);
        
        res.json(response);
    });

    // API: reset prototype scenario state
    app.post('/api/v1/stubs/reset', function(req, res) {
        var response = stubs.reset();
        res.json(response);
    });
};

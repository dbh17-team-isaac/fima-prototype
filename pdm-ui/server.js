'use strict';

const express = require('express');
const Web3 = require('web3');

// Configuration
var config = {
    listenPort: 8080,
    parityUrl: "http://blockchain:8545"
};

// API
const app = express();

// API: retrieve identity attributes
app.get('/api/v1/identity/:identityId/attributes', function(req, res) {
    var identityId = req.params.identityId;
    res.send('TODO');
});

// API: retrieve identity authorizations
app.get('/api/v1/identity/:identityId/authorization', function(req, res) {
    var identityId = req.params.identityId;
    res.send('TODO'); 
});

// API: retrieve identity requests
app.get('/api/v1/identity/:identityId/request', function(req, res) {
    var identityId = req.params.identityId;
    res.send('TODO'); 
});

// API: confirm request
app.post('/api/v1/identity/:identityId/request/:requestId', function(req, res) {
    var identityId = req.params.identityId;
    var requestId = req.params.requestId;
    res.send('TODO');
});

// API: request authorization
app.post('/api/v1/request', function(req, res) {
    // askIdentityId
    // targetIdentityId
    // requestFields
    console.log(req.body);
    res.send('TODO');
});

// Listen on specific port
app.listen(config.listenPort);

// Serve static files from public/
app.use(express.static('public'));

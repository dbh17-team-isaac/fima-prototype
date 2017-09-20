'use strict';

const bodyParser = require('body-parser');
const express = require('express');

// Configuration
var config = {
    blockchainFIMAAccount: "0x00cEB73c4577084C934eA579e7A8271778449008",
    listenPort: 8080,
    parityUrl: "http://blockchain:8545",
    websocketPort: 3000
};

// --------------------
// Bootstrap Blockchain
// --------------------
const FIMA = require('./lib/fima.js');
const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider(config.parityUrl));
let fima = new FIMA(config.blockchainFIMAAccount, web3);

let contractsRegistry = fima.bootstrapContracts();

// --------------
// HTTP interface
// --------------

const httpApp = express();
httpApp.use(bodyParser.json());

// Serve static files from public/
httpApp.use(express.static('public'));

// -------------------
// Websocket interface
// -------------------

var wsApp = express();
var expressWs = require('express-ws')(wsApp);

// Enable API
var API = require('./lib/api.js');
var api = new API(httpApp, wsApp, web3, contractsRegistry);

// Listen on configured ports
httpApp.listen(config.listenPort);
wsApp.listen(config.websocketPort);

// ------------------
// Contract listeners
// ------------------

var authContract = fima.getAuthorizationTrackerContract(contractsRegistry.authorizationTracker.address);

authContract.Authorization(function(error, result) {
    var granteeId = fima.bytes32ToNumber(result.args.encryptedGrantee);
    console.log('Authorization received for grantee ' + granteeId);

    api.sendWebsocketMessage(granteeId, 'AuthorizationCreated');
});

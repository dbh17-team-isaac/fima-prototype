'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const Web3 = require('web3');

// Configuration
var config = {
    listenPort: 8080,
    parityUrl: "http://blockchain:8545",
    websocketPort: 3000
};

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
var api = require('./lib/api.js');
api(httpApp, wsApp);

// Listen on configured ports
httpApp.listen(config.listenPort);
wsApp.listen(config.websocketPort);

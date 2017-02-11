'use strict';

const express = require('express');
const Web3 = require('web3');

// Configuration
var config = {
    listenPort: 8080,
    parityUrl: "http://blockchain:8545"
};

const app = express();

// Enable API
var api = require('./lib/api.js');
api(app);

// Listen on specific port
app.listen(config.listenPort);

// Serve static files from public/
app.use(express.static('public'));

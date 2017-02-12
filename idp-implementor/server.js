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
app.get('/test', function (req, res) {

    var web3 = new Web3(new Web3.providers.HttpProvider(config.parityUrl));

    res.send('version: ' + web3.version.node);

});

// Listen on specific port
app.listen(config.listenPort);

// Serve static files from public/
app.use(express.static('public'));


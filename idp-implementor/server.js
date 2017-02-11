'use strict';

const express = require('express');
const Web3 = require('web3');

// API
const app = express();
app.get('/test', function (req, res) {
  res.send('Hello world\n');
});

// Listen on 8080
app.listen(8080);

// Serve static files from public/
app.use(express.static('public'));


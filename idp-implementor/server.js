'use strict';

const express = require('express');
const Web3 = require('web3');

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(8080);


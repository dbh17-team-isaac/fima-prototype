'use strict';

const express = require('express');

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(8080);

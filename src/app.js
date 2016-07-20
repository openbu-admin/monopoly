'use strict';

var express = require('express');
var app = express();
var router = require('./api/');
var parser = require('body-parser');

require('./db');

app.use('/', express.static('public'));
app.use(parser.json());
app.use('/api', router);


app.listen(8000, function(){
  console.log('Server start on port 8000!');
});

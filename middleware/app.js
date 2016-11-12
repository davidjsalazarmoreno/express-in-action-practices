var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');

var app = express();

/**
 * Logger
 */
app.use(morgan('short'));

/**
 * Static file request handler
 */
var filePath = path.join(__dirname,  'static');
app.use(express.static(filePath));

/**
 * 404 Handler
 */
app.use(function(req, res) {
  res.status(404).send('Oops, file '+ req.url + ' not found.')
});

app.listen(3000, function() {
  console.log('App started on port 3000');
});

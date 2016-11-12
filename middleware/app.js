var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

/**
 * Logger
 */
app.use(function(req, response, next) {
  console.log('Request IP ' + req.url);
  console.log('Request date ' + new Date());
  next();
});

/**
 * Static file request handler
 */
app.use(function(req, res, next) {
  var filePath = path.join(__dirname,  'static', req.url);
  console.log(filePath);
  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      next();
      return;
    }

    if (fileInfo.isFile()) {
      res.sendFile(filePath);

    } else {
      next();
    }
  });
});

/**
 * 404 Handler
 */
app.use(function(req, res) {
  res.status(404).send('Oops, file '+ req.url + ' not found.')
});

app.listen(3000, function() {
  console.log('App started on port 3000');
});

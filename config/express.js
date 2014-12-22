/**
 * Express configuration
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/views');
  app.set('view engine', 'jade');

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use('/', express.static(path.join(config.root, 'public')));

  if ('development' === env || 'test' === env) {
    app.use(errorHandler());
  }
};

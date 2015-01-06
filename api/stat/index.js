'use strict';

var express = require('express');
var utils = require('rh-node-utils');
var controller = require('./stat.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/badge', controller.badge);
router.get('/count', controller.count);
router.post('/', utils.internal(), controller.create);

module.exports = router;

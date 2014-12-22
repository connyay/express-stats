'use strict';

var express = require('express');
var controller = require('./stat.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/count', controller.count);
router.post('/', controller.create);

module.exports = router;

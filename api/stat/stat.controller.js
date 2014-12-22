'use strict';

var Stat = require('./stat.model');
var cachedCount = 0;

function handleError(res, err) {
  return res.send(500, err);
}

function getCount(cb) {
  Stat.aggregate({
    $group: {
      _id: null,
      count: {
        $sum: '$amount'
      },
      docs: {
        $sum: 1
      }
    }
  }).exec(function(err, aggregate) {
    if (err) {
      return cb();
    }
    if (aggregate && aggregate.length) {
      var data = aggregate[0];
      if (data && data.count) {
        cachedCount = data.count;
        cb(data.count);
      }
    }
  });
}

exports.index = function(req, res) {
  getCount(function(count) {
    res.render('index', {
      count: count || 0
    });
  });
};

exports.create = function(req, res) {
  Stat.create(req.body, function(err, stat) {
    if (err) {
      return handleError(res, err);
    }
    cachedCount += stat.amount;
    return res.json(201, stat);
  });
};

exports.count = function(req, res) {
  return res.json({
    count: cachedCount || 0
  });
};
// noop to cache the count
getCount(function() {});

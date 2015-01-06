'use strict';

var Stat = require('./stat.model');
var shields = require('shields-lightweight');
var cachedCount = 0;
var messages = [' Beans mapped ', ' Proxies reversed ', ' Requests '];

function random(list) {
    return list[Math.floor((Math.random() * list.length))];
}


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
        } else {
            cachedCount = 0;
            cb(0);
        }
    });
}

exports.index = function(req, res) {
    res.format({
        html: function() {
            getCount(function(count) {
                res.render('index', {
                    count: count || 0
                });
            });
        },
        json: function() {
            if (!req.isInternalReq) {
                return res.status(401).end();
            }
            Stat.find({}, '-_id -__v').exec(function(err, stats) {
                if (err) {
                    return handleError(res, err);
                }
                res.json(stats);
            });
        }
    });
};

exports.create = function(req, res) {
    if (!req.isInternalReq) {
        return res.status(401).end();
    }
    Stat.create(req.body, function(err, stat) {
        if (err) {
            return handleError(res, err);
        }
        cachedCount += stat.amount;
        return res.json(201, stat);
    });
};

exports.badge = function(req, res) {
    var message = random(messages);
    var svgBadge = shields.svg(message, cachedCount, 'green', 'flat-square');
    res.writeHead(200, {
        'access-control-allow-origin': '*',
        'cache-control': ' max-age=300',
        'Content-Type': 'image/svg+xml'
    });
    res.end(svgBadge);
};

exports.count = function(req, res) {
    return res.json({
        count: cachedCount || 0
    });
};
// noop to cache the count
getCount(function() {});

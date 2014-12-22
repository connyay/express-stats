'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatSchema = new Schema({
    amount: {
        type: Number,
        default: 1
    },
    host: String,
    reported: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Stat', StatSchema);

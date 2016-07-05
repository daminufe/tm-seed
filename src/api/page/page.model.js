'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var schema = Schema({
    name: String,
    values: Schema.Types.Mixed,
    created: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updated: Date,
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Page', schema);

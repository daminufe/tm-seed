'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = Schema({
    created: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updated: Date,
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    enabled: Boolean,
    isoCode: { type: String, max: 2 },
    internationalName: String,
    nativeName: String,
    strings: Schema.Types.Mixed
});

module.exports = mongoose.model('Language', schema);

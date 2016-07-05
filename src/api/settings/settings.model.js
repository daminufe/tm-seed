'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let schema = Schema({
    key: String,
    label: String,
    public: Boolean,
    type: String,
    value: Schema.Types.Mixed
});

module.exports = mongoose.model('Settings', schema);

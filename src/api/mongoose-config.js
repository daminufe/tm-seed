'use strict';

let mongoose = require('mongoose');
let config = require('./config');
let glob = require('glob');

mongoose.connect(config.db);

let db = mongoose.connection;

db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});
console.log('Connected to database ' + config.db);

let models = glob.sync(config.path.api + '/**/*.model.js');
models.forEach(function (model) {
    require(model);
});

module.exports = mongoose;

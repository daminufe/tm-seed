'use strict';

let server = require('../server');
let RoleAccess = require('../role-access');

let Controller = require('./image-upload.controller');

server.use(RoleAccess({
    'prefix': '/api/file-upload',
    'roles': ['admin']
}));

server.post('/api/file-upload', Controller.postImage);

module.exports = server;

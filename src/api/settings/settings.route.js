'use strict';

let server = require('../server');
let RoleAccess = require('../role-access');

let Controller = require('./settings.controller');

server.use(RoleAccess({
    'prefix': '/api/settings',
    'roles': ['admin']
}));

server.get('/api/public/settings', Controller.getPublicSettings);

server.get('/api/settings', Controller.getSettings);
server.put('/api/settings', Controller.putSettings);

module.exports = server;

'use strict';

let server = require('../server');
let RoleAccess = require('../role-access');
let Controller = require('./page.controller');

server.use(RoleAccess({
    'prefix': '/api/page',
    'roles': ['admin']
}));

server.get('/api/public/page', Controller.getPageData);
server.get('/api/public/page/:name', Controller.getPageData);

server.post('/api/page', Controller.postPage);
server.put('/api/page/:name', Controller.putPage);

module.exports = server;

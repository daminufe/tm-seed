'use strict';

let server = require('../server');
let roleAccess = require('../role-access');

let Controller = require('./user.controller');

server.post('/api/auth', Controller.auth);
server.post('/api/refresh-token', Controller.refreshToken);
server.post('/api/recover-password', Controller.recoverPassword);

server.use(roleAccess({
    'prefix': '/api/user',
    'roles': ['admin']
}));

server.post('/api/user/change-password', Controller.changePassword);

server.get('/api/user', Controller.getUsers);
server.get('/api/user/:userId', Controller.getUser);
server.post('/api/user', Controller.createUser);
server.put('/api/user/:userId', Controller.updateUser);
server.del('/api/user/:userId', Controller.deleteUser);

module.exports = server;

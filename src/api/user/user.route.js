'use strict'

import server from '../server'
import roleAccess from '../role-access'

import * as Controller from './user.controller'

server.post('/api/auth', Controller.auth)
server.post('/api/refresh-token', Controller.refreshToken)
server.post('/api/recover-password', Controller.recoverPassword)

server.use(roleAccess({
    'prefix': '/api/user',
    'roles': ['admin']
}))

server.post('/api/user/change-password', Controller.changePassword)

server.get('/api/user', Controller.getUsers)
server.get('/api/user/:userId', Controller.getUser)
server.post('/api/user', Controller.createUser)
server.put('/api/user/:userId', Controller.updateUser)
server.del('/api/user/:userId', Controller.deleteUser)

export default server

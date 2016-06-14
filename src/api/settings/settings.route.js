'use strict'

import server from '../server'
import RoleAccess from '../role-access'

import * as Controller from './settings.controller'

server.use(RoleAccess({
    'prefix': '/api/settings',
    'roles': ['admin']
}))

server.get('/api/public/settings', Controller.getPublicSettings)

server.get('/api/settings', Controller.getSettings)
server.put('/api/settings', Controller.putSettings)

export default server

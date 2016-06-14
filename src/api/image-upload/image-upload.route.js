'use strict'

import server from '../server'
import RoleAccess from '../role-access'

import * as Controller from './image-upload.controller'

server.use(RoleAccess({
    'prefix': '/api/file-upload',
    'roles': ['admin']
}))

server.post('/api/file-upload', Controller.postImage)

export default server

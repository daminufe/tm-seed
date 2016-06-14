'use strict'

import server from '../server'
import RoleAccess from '../role-access'

server.use(RoleAccess({
    'prefix': '/api/page',
    'roles': ['admin']
}))

server.get('/api/public/page', getPageData)
server.get('/api/public/page/:name', getPageData)

server.post('/api/page', postPage)
server.put('/api/page/:name', putPage)

export default server

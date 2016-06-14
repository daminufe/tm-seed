'use strict'

import server from '../server'
import RoleAccess from '../role-access'

import * as Controller from './language.controller'

server.use(RoleAccess({
    'prefix': '/api/language',
    'roles': ['admin']
}))

server.get('/api/public/language', Controller.getLanguages)
server.get('/api/public/language/:isoCode', Controller.getLanguage)

server.post('/api/language', Controller.postLanguage)
server.get('/api/language', Controller.getAdminLanguages)
server.put('/api/language/put-strings', Controller.putStrings)
server.put('/api/language/:languageId', Controller.putLanguage)
server.put('/api/language/:languageId/:stringId', Controller.putString)

export default server

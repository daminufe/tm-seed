'use strict'

import path from 'path'

let rootPath = path.normalize(__dirname + '/..')

let config = {
    development: {
        path: {
            root: rootPath,
            api: rootPath + '/api',
            app: rootPath + '/app'
        },
        db: 'mongodb://localhost/es6-skeleton',
        secret: 'jwt-development-key',
        host: 'http://localhost:3000',
        mailer: {
            from: process.env.MAILER_FROM || 'MAILER_FROM',
            options: {
                service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
                auth: {
                    user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                    pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
                }
            }
        }
    },

    staging: {
        path: {
            root: rootPath,
            api: rootPath + '/api',
            app: rootPath + '/app'
        },
        db: 'mongodb://localhost/es6-skeleton',
        secret: process.env.APP_SECRET,
        host: '',
        mailer: {
            from: process.env.MAILER_FROM || 'MAILER_FROM',
            options: {
                service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
                auth: {
                    user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                    pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
                }
            }
        }
    },

    production: {
        path: {
            root: rootPath,
            api: rootPath + '/api',
            app: rootPath + '/app'
        },
        db: 'mongodb://localhost/es6-skeleton',
        secret: process.env.APP_SECRET,
        host: '',
        mailer: {
            from: process.env.MAILER_FROM || 'MAILER_FROM',
            options: {
                service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
                auth: {
                    user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                    pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
                }
            }
        }
    }
}

export default config[process.env.NODE_ENV || 'development']

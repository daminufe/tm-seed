'use strict'

import _ from 'lodash'

export default (options) => (req, res, next) => {
    if (req.url.indexOf(options.prefix) >= 0) {
        let allowed = false

        if (req.user) {
            _.each(options.roles, (role) => {
                _.each(req.user.roles, (userRole) => {
                    if (role === userRole) {
                        allowed = true
                    }
                })
            })
        }

        if (!allowed) {
            return res.send(403, {
                error: 'Forbidden'
            })
        } else {
            return next()
        }
    }
    return next()
}

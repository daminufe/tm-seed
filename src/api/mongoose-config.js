'use strict'

import mongoose from 'mongoose'
import config from './config'
import glob from 'glob'

mongoose.connect(config.db)

let db = mongoose.connection

db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db)
})
console.log('Connected to database ' + config.db)

let models = glob.sync(config.path.api + '/**/*.model.js')
models.forEach(function (model) {
    require(model)
})

export default mongoose

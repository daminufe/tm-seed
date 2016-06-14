'use strict'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongoosePaginate from 'mongoose-paginate'

const SALT_WORK_FACTOR = 10

let schema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {type: String, required: true},
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: true
    }
})
schema.plugin(mongoosePaginate)

schema.pre('save', (next) => {
    let user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

schema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

export default mongoose.model('User', schema)

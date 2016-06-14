'use strict'
import mongoose from 'mongoose'

let Schema = mongoose.Schema

let schema = Schema({
    key: String,
    label: String,
    public: Boolean,
    type: String,
    value: Schema.Types.Mixed
})

export default mongoose.model('Settings', schema)

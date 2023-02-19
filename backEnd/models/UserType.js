const mongoose = require('mongoose')

const userTypeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('UserType', userTypeSchema)
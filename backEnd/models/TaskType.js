const mongoose = require('mongoose');

const taskTypeSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('TaskType', taskTypeSchema)
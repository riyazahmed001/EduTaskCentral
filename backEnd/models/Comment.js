const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Types.ObjectId,
        ref: 'Task' ,
        required: true,
    },
    TimeEntered: {
        type: Date,
        default: Date.now,
    },
    commentedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Comment', commentSchema)
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskType: {
        type: String,
        required: true,
    },
    numberOfEvents: {
        type: Number,
        required: true,
        min: 1,
        max: 15
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    childTaskList: [
        { 
            type: mongoose.Types.ObjectId,
            ref: 'Task'
        }
    ],
    assignedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    },
    assignedTo: {
        type: mongoose.Types.ObjectId,
        ref: 'User' ,
        required: true,
    },
    taskStatus: {
        type: String,
        enum : ['TO DO','IN PROGRESS', 'DONE'],
        default: 'TO DO'
    }
});

module.exports = mongoose.model('Task', taskSchema)
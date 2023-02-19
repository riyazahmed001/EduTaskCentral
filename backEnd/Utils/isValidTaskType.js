const TaskType = require('../models/TaskType');

const isValidTaskType = async function (taskTypeCode) {
    try {
        const taskType = await TaskType.find({ code: taskTypeCode });
        return taskType.length > 0;
    } catch(err) {
        return false;
    }
}

exports.isValidTaskType = isValidTaskType;
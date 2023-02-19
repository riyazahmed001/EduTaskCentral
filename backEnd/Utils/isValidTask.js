const Task = require('../models/Task');

const isValidTaskList = async function (tasksList) {
    try {
        if(tasksList.length == 0)
            return true;
        for(let i = 0; i < tasksList.length; i++) {
            if(! await isValidTask(tasksList[i].toString())) {
                return false;
            }
        }
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const isValidTask = async function (taskId) {
    try {
        const task = await Task.find({ _id: taskId });
        return task.length > 0;
    } catch(err) {
        return false;
    }
}
exports.isValidTaskList = isValidTaskList;
exports.isValidTask = isValidTask;
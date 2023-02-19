const { validationResult } = require('express-validator');
const User = require('../models/User');
const Task = require('../models/Task');
const TaskType = require('../models/TaskType');
const Comment = require('../models/Comment');
const HttpError = require('../models/HttpError');
const accountDetailsBuilder = require('../Builder/AccountDetailsBuilder');

const getAccountDetails = async (req, res, next) => {
    try {
        let userId = req.session._id
        const currentUser = await User.find({ _id: userId } );
        const assignedByUser = await Task.find({ assignedBy: userId })
                                .populate('assignedBy')
                                .populate('assignedTo')
                                .populate({path: 'childTaskList',match: { _id: { $ne: null }}});
        const assignedToUser = await Task.find({ assignedTo: userId })
                                .populate('assignedBy')
                                .populate('assignedTo')
                                .populate({path: 'childTaskList',match: { _id: { $ne: null }}});
        const allUserTaskList = getAllUserTaskList(assignedByUser, assignedToUser);
        const commentsForAllTask = await Comment.find({ taskId: { $in: allUserTaskList }})
                                        .populate('commentedBy');
        const taskType = await TaskType.find();

        res.json(accountDetailsBuilder.build(currentUser[0],assignedByUser, assignedToUser, commentsForAllTask, taskType));
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong',500)
        );
    }
}

function getAllUserTaskList(assignedByUser, assignedToUser) {
    let  combinedTaskList = [...assignedByUser, ...assignedToUser]; // merging two list
    let combinedTaskIdList = combinedTaskList.map((element)=>element._id.toString());
    return combinedTaskIdList;
}
exports.getAccountDetails = getAccountDetails;
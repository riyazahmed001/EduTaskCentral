const UserDetails = require('../models/AccountDetails/UserDetails');
const AccountDetails = require('../models/AccountDetails/AccountDetails');
const AccessDetails = require('../models/AccountDetails/AccessDetails');
const TaskDetails = require('../models/AccountDetails/TaskDetails');
const CommentDetails = require('../models/AccountDetails/CommentDetails');
const { formatDate } = require('../Utils/UtilMethods');

const build = function (currentUser,assignedByUser, assignedToUser, commentsForAllTask, taskType) {

    let userDetail = new UserDetails(currentUser.id, currentUser.name, currentUser.rollNumber, currentUser.username, currentUser.usertype);
    let accessDetail = new AccessDetails(true);
    let taskAssignedToMe = getTaskDetails(assignedToUser, commentsForAllTask, taskType);
    let taskAssignedByMe = getTaskDetails(assignedByUser, commentsForAllTask, taskType);

    let accountDetail = new AccountDetails(userDetail, accessDetail, taskAssignedToMe, taskAssignedByMe);

    return accountDetail;
}

function getTaskDetails(taskList, commentsList, taskTypeList) {
    let taskDetails = [];
    
    taskList.forEach((task) => {
        let taskDetail = new TaskDetails(task._id, getTaskName(task.taskType, taskTypeList), task.numberOfEvents, task.description, task.startDate,
                                            task.endDate, task.childTaskList, getUser(task.assignedBy), getUser(task.assignedTo),
                                            task.taskStatus, getComments(task._id.toString(), commentsList));
        taskDetails.push(taskDetail);
    });

    return taskDetails;
}

function getTaskName(code, taskTypeList) {
    let taskType = taskTypeList.filter((element)=>  element.code == code);
    
    if(taskType.length > 0) {
        return taskType[0].name;
    }

    return '';
}

function getUser(user) {
    let userDetail = new UserDetails(user.id, user.name, user.rollNumber, user.username, user.usertype);
    return userDetail;
}

function getComments(taskId, commentsList) {
    let commentDetailsList = []
    
    let filteredCommentsListByTaskId = commentsList.filter((element)=>  element.taskId.toString() == taskId);

    filteredCommentsListByTaskId.forEach((filteredComment) => {
        let comment = new CommentDetails(filteredComment.commentedBy.name, filteredComment.commentedBy.rollNumber,
            filteredComment.description, formatDate(filteredComment.TimeEntered));
        commentDetailsList.push(comment);
    });

    return commentDetailsList;
}

exports.build = build;
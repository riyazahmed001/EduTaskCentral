const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const Comment = require('../models/Comment');
const { isValidUser } = require('../Utils/isValidUser');
const { isValidTask } = require('../Utils/isValidTask');

const getAllComments = async (req, res, next) => {
    try {
        const comment = await Comment.find()
                            .populate('taskId')
                            .populate('commentedBy', '-password');
        res.json(comment);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find all comments',500)
        );
    }
}

const getCommentsByTaskId = async (req, res, next) => {
    try {
        let taskId = req.params.taskId;
        const comment = await Comment.find({ taskId: taskId })
                                .populate('taskId')
                                .populate('commentedBy', '-password')
                                .sort('TimeEntered');
        res.json(comment);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find comment',500)
        );
    }
}

const addComments = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const comment = new Comment({
        taskId: req.body.taskId,
        commentedBy: req.body.commentedBy,
        description: req.body.description
    });

    if(await isCommentValid(comment)) {
        try {
            const newComment = await comment.save();
            res.status(201).json(newComment);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('comment couldnt be added', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
}


async function isCommentValid(comment) {
    const isCommentedByValidUser = await isValidUser(comment.commentedBy);
    const isTaskIdValid = await isValidTask(comment.taskId);
    console.log([isCommentedByValidUser, isTaskIdValid]);
    return isCommentedByValidUser && isTaskIdValid;
}

exports.getAllComments = getAllComments;
exports.getCommentsByTaskId = getCommentsByTaskId;
exports.addComments = addComments;
const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const TaskType = require('../models/TaskType');

const getAllTaskType = async (req, res, next) => {
    try {
        const taskType = await TaskType.find();
        res.json(taskType);
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find taskType.',500)
        );
    }
};

const addTaskType = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const taskType = new TaskType({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newTaskType = await taskType.save();
        res.status(201).json(newTaskType);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('task couldnt be created', 400)
        );
    }
}

exports.getAllTaskType = getAllTaskType;
exports.addTaskType = addTaskType;
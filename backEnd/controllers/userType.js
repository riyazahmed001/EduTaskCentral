const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const UserType = require('../models/UserType');

const getAllUserType = async (req, res, next) => {
    try {
        const userType = await UserType.find();
        res.json(userType)
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find UserTypes.',500)
        );
    }
};

const addUserType = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const userType = new UserType({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newUserType = await userType.save();
        res.status(201).json(newUserType);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('user couldnt be created', 400)
        );
    }
}

exports.getAllUserType = getAllUserType;
exports.addUserType = addUserType;
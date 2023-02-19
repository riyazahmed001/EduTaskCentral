const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const User = require('../models/User');
const { isUserTypeValid } = require('../Utils/isValidUserType');
const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        return next(
            new HttpError('Something went wrong, could not find users.',500)
        );
    }
};

const addUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const user = new User({
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
    });
    
    if(await isUserTypeValid(user.usertype)) {
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('user couldnt be created', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid user type passed', 422)
        );
    }
}

exports.getAllUser = getAllUser;
exports.addUser = addUser;
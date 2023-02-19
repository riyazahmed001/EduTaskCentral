const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const Group = require('../models/Group');
const { isValidUserIdList } = require('../Utils/isValidUser');

const getAllGroup = async (req, res, next) => {
    try {
        const group = await Group.find()
                                    .populate({path: 'userId',match: { _id: { $ne: null }}, select: 'name rollNumber usertype'});
        res.json(group);
    } catch (err) {
        console.log(err);
        return next(
            new HttpError('Something went wrong, could not find group',500)
        );
    }
};

const createGroup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const group = new Group({
        groupName: req.body.groupName,
        userId: req.body.userId || []
    });

    if(await isValidUserIdList(group.userId)) {
        try {
            const newGroup = await group.save();
            res.status(201).json(newGroup);
        } catch (err) {
            console.log(err.message)
            return next(
                new HttpError('group couldnt be added', 400)
            );
        }
    } else {
        return next(
            new HttpError('Invalid inputs passed', 422)
        );
    }
}

const addUsersToGroup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    try {
        const groupId = await Group.findById(req.body.groupId);
        if(groupId == null) {
            return next(
                new HttpError('group id is invalid', 400)
            );
        }
        if (req.body.userId != null && await isValidUserIdList(req.body.userId)) {
            let  concatUserIdList = [...req.body.userId, ...groupId.userId]; // merging two list
            let concatUserIdListConvertedToString = concatUserIdList.map((element)=>element.toString());
            let uniqueUserIdList = [...new Set(concatUserIdListConvertedToString)]; // removing duplicates
            groupId.userId = uniqueUserIdList;
        } 
        else {
            console.log("user id list sent is invalid");
        }
        const updatedGroup = await groupId.save();
        res.json(updatedGroup);
    } catch (err) {
        console.log(err.message);
        return next(
            new HttpError('group couldnt be updated', 400)
        );
    }
}

exports.getAllGroup = getAllGroup;
exports.createGroup = createGroup;
exports.addUsersToGroup = addUsersToGroup;
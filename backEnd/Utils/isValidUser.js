const User = require('../models/User');

const isValidUserIdList = async function (userIdList) {
    try {
        if(userIdList.length == 0)
            return true;
        for(let i = 0; i < userIdList.length; i++) {
            if(! await isValidUser(userIdList[i].toString())) {
                return false;
            }
        }
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
};

const isValidUser = async function (userId) {
    try {
        const user = await User.find({ _id: userId });
        return user.length > 0;
    } catch(err) {
        return false;
    }
};

exports.isValidUser = isValidUser;
exports.isValidUserIdList = isValidUserIdList;
const UserType = require('../models/UserType');

const isUserTypeValid = async function (userTypeCode) {
    try {
        const userType = await UserType.find({ code: userTypeCode });
        return userType.length > 0;
    } catch(err) {
        return false;
    }
}

exports.isUserTypeValid = isUserTypeValid;
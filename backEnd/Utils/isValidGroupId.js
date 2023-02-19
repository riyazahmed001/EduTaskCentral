const Group = require('../models/Group');

const isValidGroupId = async function (groupId) {
    try {
        const group = await Group.find({ _id: groupId });
        return group.length > 0;
    } catch(err) {
        return false;
    }
};

exports.isValidGroupId = isValidGroupId;
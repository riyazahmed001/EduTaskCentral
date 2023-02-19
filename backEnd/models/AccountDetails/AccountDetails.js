const AccountDetails = class {
    constructor(userDetails, accessDetails, taskAssignedToMe, taskAssignedByMe) {
      this.userDetails = userDetails;
      this.accessDetails = accessDetails;
      this.taskAssignedToMe = taskAssignedToMe;
      this.taskAssignedByMe = taskAssignedByMe;
    }
};

module.exports = AccountDetails;
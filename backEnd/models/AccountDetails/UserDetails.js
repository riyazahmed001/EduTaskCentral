const UserDetails = class {
    constructor(id, name, rollNumber, userName, userType) {
      this.id = id;
      this.name = name;
      this.rollNumber = rollNumber;
      this.userName = userName;
      this.userType = userType;
    }
};

module.exports = UserDetails;
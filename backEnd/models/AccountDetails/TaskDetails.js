const TaskDetails = class {
    constructor(id, name, numberOfEvents, description, startDate, endDate,
                childTaskList, assignedBy, assignedTo, taskStatus, commentDetails) {
      this.id = id;
      this.name = name;
      this.numberOfEvents = numberOfEvents;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.startDate = startDate;
      this.childTaskList = childTaskList;
      this.assignedBy = assignedBy;
      this.assignedTo = assignedTo;
      this.taskStatus = taskStatus;
      this.commentDetails = commentDetails;
    }
};

module.exports = TaskDetails;
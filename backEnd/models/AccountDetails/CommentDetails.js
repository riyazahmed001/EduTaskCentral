const CommentDetails = class {
    constructor(commentedByName, commentedByRollNumber, description, time) {
      this.commentedByName = commentedByName;
      this.commentedByRollNumber = commentedByRollNumber;
      this.description = description;
      this.time = time;
    }
};

module.exports = CommentDetails;
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Completed", "Expired"],
    default: "Todo"
  },
  category: {
    type: String,
    enum: ["Bug", "Feature", "Improvement"],
    default: "Feature"
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  dueDate: Date,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  }
});

module.exports = mongoose.model("Task", taskSchema);

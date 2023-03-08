const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });
  
module.exports = mongoose.model("Task", taskSchema);
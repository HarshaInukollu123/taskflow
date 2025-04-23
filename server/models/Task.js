import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
    title : {type : String, required : true},
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate : {type : Date},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;










// scorecard model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, required: true, default: "open" },
  createdTime: { type: Date, required: true },
  body: { type: String }, // optional
});

export const Task = mongoose.model("Task", TaskSchema);
// module.exports = Task;

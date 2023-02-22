// scorecard model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  issueId: { type: Number, required: true },
  status: { type: String, required: true },
});

export const Task = mongoose.model("Task", TaskSchema);

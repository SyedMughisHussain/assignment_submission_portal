import mongoose from "mongoose";
import { Schema } from "mongoose";

const assignmentSchema = new Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    file: {
        type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Evaluating", "Ended"],
      default: "Active",
    },
    assignTo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;

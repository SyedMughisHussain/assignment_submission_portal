import mongoose, { Schema } from "mongoose";
import { Schema } from "mongoose";

const submissionSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    assignmentId: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
    },
    comment: {
      type: String,
    },
    submissionFile: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;

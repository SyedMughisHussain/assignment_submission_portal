import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    rollNo: {
      type: String,
      required: true,
      unique: true
    },
    batch: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    role: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;

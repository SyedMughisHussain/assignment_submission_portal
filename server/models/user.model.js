import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
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
    role: {
      type: String,
      default: "student"
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

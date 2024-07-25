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
    confirmPassword: {
      type: String,
      required: true,
    },
    role: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

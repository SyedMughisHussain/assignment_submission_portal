import express from "express";

import {
  signInStudent,
  signUpStudent,
  getProfile,
} from "../controllers/student.controller.js";
import authToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/signup/student").post(signUpStudent);
router.route("/signin/student").post(signInStudent);
router.route("/profile").get(authToken, getProfile);

export default router;

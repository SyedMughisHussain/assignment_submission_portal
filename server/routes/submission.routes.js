import express from "express";
import authToken from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

import {
  makeSubmission,
  evaluateSubmission,
  getSubmissionsByTeacher,
  getSubmissionsByStudent,
} from "../controllers/submission.controller.js";

let router = express.Router();

router
  .route("/assignment")
  .post(authToken, upload.single("submissionFile"), makeSubmission);
router.route("/evaluate").put(authToken, evaluateSubmission);
router.route("/getSubmissionByTeacher").get(authToken, getSubmissionsByTeacher);
router.route("/getSubmissionByStudent").get(authToken, getSubmissionsByStudent);

export default router;

import express from 'express';

import { signInTeacher, signUpTeacher } from '../controllers/teacher.controller.js';

const router = express.Router();

router.route("/signup/teacher").post(signUpTeacher);
router.route("/signin/teacher").post(signInTeacher);

export default router;
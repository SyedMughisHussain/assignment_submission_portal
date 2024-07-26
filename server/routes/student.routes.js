import express from 'express';

import { signInStudent, signUpStudent } from '../controllers/student.controller.js';

const router = express.Router();

router.route('/signup/student').post(signUpStudent)
router.route('/signin/student').post(signInStudent)

export default router;
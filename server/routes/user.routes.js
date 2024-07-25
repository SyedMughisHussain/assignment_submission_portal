import express from 'express';

import { signUpUser, signInUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/signup').post(signUpUser)
router.route('/signin').post(signInUser)


export default router;
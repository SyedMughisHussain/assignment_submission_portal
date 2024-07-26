import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import authToken from '../middleware/auth.middleware.js';

import { createAssignment, editAssignment, deleteAssignment, getAllAssignmentsByStudent, getAssignmentById, getAllAssignmentsByTeacher } from '../controllers/assignment.controller.js';

const router = express.Router();

router.route("/createAssignment").post(upload.single("file"), createAssignment);
router.route("/getAssignment/:id").get(getAssignmentById); 
router.route("/editAssignment/:id").put(upload.single("file"), editAssignment);
router.route("/deleteAssignment/:id").delete(deleteAssignment)
router.route("/getAllAssignmentsByStudent").get(authToken, getAllAssignmentsByStudent);
router.route("/getAllAssignmentsByTeacher").get(authToken, getAllAssignmentsByTeacher);

export default router;
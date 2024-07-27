import Submission from "../models/submission.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const makeSubmission = async (req, res) => {
  try {
    const { assignmentId, teacherId, githubUrl, comment } = req.body;

    console.log(req.file);
    const filePath = req.file?.path;
    let file = await uploadOnCloudinary(filePath);

    const payload = {
      studentId: "Hello, world",
      assignmentId,
      teacherId,
      githubUrl,
      comment,
      submissionFile: file.url,
    };

    const submission = await Submission.create(payload);

    res.status(201).json({
      message: "Submission created successfully",
      success: true,
      error: false,
      data: submission,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getSubmissionsByStudent = async (req, res) => {
  try {
    const id = req.userId;

    const submissions = await Submission.find({ studentId: id });

    res.status(200).json({
      success: true,
      error: false,
      data: submissions,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getSubmissionsByTeacher = async (req, res) => {
  try {
    const id = req.userId;

    const submissions = await Submission.find({ teacherId: id });

    res.status(200).json({
      success: true,
      error: false,
      data: submissions,
      message: "Submission fetched successfully.",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const evaluateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { evaluation } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      { evaluation },
      { new: true }
    );

    res.status(200).json({
      success: true,
      error: false,
      data: submission,
      message: "Submission evaluated successfully.",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export {
  makeSubmission,
  getSubmissionsByStudent,
  getSubmissionsByTeacher,
  evaluateSubmission,
};

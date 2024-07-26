import Assignment from "../models/assignment.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Student from "../models/student.model.js";

const createAssignment = async (req, res) => {
  try {
    const { title, description, startDate, endDate, assignTo } = req.body;

    console.log(req.file);

    const filePath = req.file?.path;

    console.log(filePath);

    if (!filePath) {
      throw new Error("No file uploaded");
    }

    const file = await uploadOnCloudinary(filePath);

    if (!file) {
      throw new Error("Failed to upload file to cloudinary");
    }

    console.log(file);

    const payload = {
      teacherId: "helloworld",
      title,
      description,
      startDate,
      endDate,
      file: file.url,
      assignTo,
    };

    const assignment = await Assignment.create(payload);

    res.status(201).json({
      assignment,
      success: true,
      error: false,
      message: "Assignment created successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getAssignmentById = async (req, res) => {
     try {
        let { id } = req.params;

        const assignment = await Assignment.findById(id);
        if (!assignment) {
            throw new Error("Assignment not found");
        }

        res.status(200).json({
            assignment,
            success: true,
            error: false,
        });
     } catch (error) {
        res.status(404).json({
            message: error.message || error,
            success: false,
            error: true,
        });
     }
}

const editAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, assignTo } = req.body;

    let fileUrl;
    if (req.file) {
      const filePath = req.file.path;
      const file = await uploadOnCloudinary(filePath);
      if (!file) {
        throw new Error("Failed to upload file to cloudinary");
      }
      fileUrl = file.url;
    }

    const payload = {
      title,
      description,
      startDate,
      endDate,
      assignTo,
    };

    if (fileUrl) {
      payload.file = fileUrl;
    }

    const assignment = await Assignment.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!assignment) {
      throw new Error("Assignment not found");
    }

    res.status(200).json({
      assignment,
      success: true,
      error: false,
      message: "Assignment updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getAllAssignmentsByStudent = async (req, res) => {
  try {
    let id = req.userId;

    let { batch } = await Student.findById(id);

    const assignments = await Assignment.find({ batch: batch });

    res.status(200).json({
      assignments,
      success: true,
      error: false,
      message: "Assignments retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getAllAssignmentsByTeacher = async (req, res) => {
  try {
    let id = req.userId;
    const assignments = await Assignment.find({ teacherId: id });

    res.status(200).json({
      assignments,
      success: true,
      error: false,
      message: "Assignments retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export {
  createAssignment,
  deleteAssignment,
  editAssignment,
  getAllAssignmentsByStudent,
  getAllAssignmentsByTeacher,
  getAssignmentById
};

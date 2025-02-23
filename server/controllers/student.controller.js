// import User from "../models/student.model.js";
import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUpStudent = async (req, res) => {
  try {
    const { name, email, password, rollNo, batch, course } = req.body;

    // if (!name) {
    //   throw new Error("Please provide name");
    // }
    // if (!email) {
    //   throw new Error("Please provide email");
    // }
    // if (!password) {
    //   throw new Error("Please provide password");
    // }
    // if (!rollNo) {
    //   throw new Error("Please provide roll no");
    // }
    // if (!batch) {
    //   throw new Error("Please provide batch");
    // }
    // if (!course) {
    //   throw new Error("Please provide course");
    // }

    const existingUser = await Student.findOne({ email });

    console.log("User", existingUser);

    if (existingUser) {
      throw new Error("Already user exist.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      return new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "student",
      password: hashPassword,
    };

    const user = await Student.create(payload);

    res.status(201).json({
      user,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const signInStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!email) {
    //   throw new Error("Please provide email");
    // }
    // if (!password) {
    //   throw new Error("Please provide password");
    // }

    const user = await Student.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    console.log("checkPassoword", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.json({
        user,
        success: true,
        error: false,
        message: "User logged in successfully",
        token,
      });
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    let id = req.userId;

    const student = await Student.findById(id);

    res.status(200).json({
      student,
      success: true,
      error: false,
      message: "Student profile retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { signUpStudent, signInStudent, getProfile };

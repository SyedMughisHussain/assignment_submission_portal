import Teacher from "../models/teacher.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const signUpTeacher = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // if (!name) {
    //   throw new Error("Please provide name");
    // }
    // if (!email) {
    //   throw new Error("Please provide email");
    // }
    // if (!password) {
    //   throw new Error("Please provide password");
    // }

    const existingUser = await Teacher.findOne({ email });

    console.log("User", existingUser);

    if (existingUser) {
      throw new Error("Already user exist.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // if (!hashPassword) {
    //   return new Error("Something is wrong");
    // }

    const payload = {
      ...req.body,
      role: "teacher",
      password: hashPassword
    };

    const user = await Teacher.create(payload);

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

const signInTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await Teacher.findOne({ email });

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
        expiresIn: 60 * 60 * 8,
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

export { signUpTeacher, signInTeacher };

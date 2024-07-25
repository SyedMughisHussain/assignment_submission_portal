import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const existingUser = await User.findOne({ email });

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
    };

    const user = await User.create(payload);

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

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = compareSync.compare(password, user.password);
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

export { signUpUser, signInUser };

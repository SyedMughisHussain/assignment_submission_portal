import jwt from "jsonwebtoken";

const authToken = async (req, res, next) => {
  try {
    const token = localStorage.getItem("token");

    console.log("Token", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token is required" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      console.log(err);
      console.log("decoded", decoded);

      if (err) {
        console.log("error auth", err);
      }

      req.userId = decoded?._id;

      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};

export default authToken;

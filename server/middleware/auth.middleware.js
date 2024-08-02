import jwt from "jsonwebtoken";

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log(authHeader);
    
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token is required" });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token", token);

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("error auth", err);
        return res.status(401).json({ message: "Unauthorized, invalid token" });
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

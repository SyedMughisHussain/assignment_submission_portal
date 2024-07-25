import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/connectDb.js";

import userRoutes from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);

connectDb()
  .then(() => {
    console.log("Database connected successfully!");
    console.log(`Server is running on port ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });

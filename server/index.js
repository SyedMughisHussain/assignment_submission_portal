import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/connectDb.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectDb()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

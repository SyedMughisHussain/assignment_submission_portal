import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/connectDb.js";

import studentRoutes from "./routes/student.routes.js"
import teacherRoutes from "./routes/teacher.routes.js"
import assignmentRoutes from "./routes/assignment.routes.js"
import submissionRoutes from "./routes/submission.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/v1/user', teacherRoutes)
app.use('/api/v1/user', studentRoutes)
app.use('/api/v1/assignment', assignmentRoutes)
app.use('/api/v1/submission', submissionRoutes)

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

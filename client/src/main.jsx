import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import TeacherSignUp from "./pages/signup/TeacherSignUp";
import StudentSignUp from "./pages/signup/StudentSignUp";
import SignIn from "./pages/signin/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signupTeacher",
    element: <TeacherSignUp />,
  },
  {
    path: "/signupStudent",
    element: <StudentSignUp />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import TeacherSignUp from "./pages/signup/TeacherSignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TeacherSignUp />,
  },
  {
    path: "/about",
    element: <About />,
    children: [
      { path: "team", element: <h2>About Team</h2> },
      { path: "contact", element: <h2>Contact Us</h2> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

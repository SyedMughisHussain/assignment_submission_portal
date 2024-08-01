import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TeacherSignUp from "../pages/signup/TeacherSignUp";
import StudentSignUp from "../pages/signup/StudentSignUp";
import SignIn from "../pages/signin/SignIn";
import StudentDashboard from "../pages/student_dashboard/StudentDashboard";

const ConfigRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher-signup" element={<TeacherSignUp />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ConfigRoute;

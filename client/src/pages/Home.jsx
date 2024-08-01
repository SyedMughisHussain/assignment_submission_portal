import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className="p-5">
          <img className="h-32 w-40" src="/SMIT_LOGO.png" alt="Smit Logo" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          Welcome to SMIT Assignment Submission Portal
        </h1>
      </div>

      <div className="mt-10">
        <div className="flex justify-center items-center">
          <Button
            size="large"
            className="px-10 py-3 text-white bg-blue-500 rounded-md"
            onClick={() => {
              navigate("/student-signup");
            }}
          >
            Register As a Student
          </Button>

          <Button
            size="large"
            className="px-10 py-3 text-white bg-blue-500 rounded-md ml-5"
            onClick={() => {
              navigate("/teacher-signup");
            }}
          >
            Register As a Teacher
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <p className="text-md">Already have an account? </p>
      </div>

      <div className="mt-5">
        <div className="flex justify-center items-center">
          <Button
            size="large"
            className="px-10 py-3 text-white bg-blue-500 rounded-md"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

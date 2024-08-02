import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("end");

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    if (values.loginAs === "student") {
      setLoading(true);
      axios
        .post("http://localhost:3000/api/v1/user/signin/student", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response.data);
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/student-dashboard");
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .post("http://localhost:3000/api/v1/user/signin/teacher", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response.data);
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate("/teacher-dashboard");
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center mt-[50px]">
      <div>
        <div className="flex justify-center items-center">
          <div className="p-5">
            <img className="h-24 w-28" src="/SMIT_LOGO.png" alt="Smit Logo" />
            <span className="font-bold w-28 text-[18px] ml-8">SignIn</span>
          </div>
        </div>
        <Form
          className="w-[500px] mr-32"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Input email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item
            label="Login as:"
            name="loginAs"
            rules={[
              {
                required: true,
                message: "Please select login as!",
              },
            ]}
          >
            <Select placeholder="e.g Student">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </Select>
          </Form.Item>

          {loading ? (
            <Form.Item
              className="flex justify-center items-center ml-10"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" loading>
                Loading
              </Button>
            </Form.Item>
          ) : (
            <Form.Item
              className="flex justify-center items-center ml-10"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                SignIn
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};
export default SignIn;

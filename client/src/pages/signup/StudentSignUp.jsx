import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("end");

  const navigate = useNavigate(); 

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    axios
      .post("http://localhost:3000/api/v1/user/signup/student", {
        name: values.name,
        email: values.email,
        password: values.password,
        rollNo: values.rollNo,
        batch: values.batch,
        course: values.course,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/signin")
      })
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="flex justify-center items-center">
          <div className="p-5">
            <img className="h-24 w-28" src="/SMIT_LOGO.png" alt="Smit Logo" />
            <span className="font-bold w-28 text-[16px]">
              SignUp Student
            </span>
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
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your fullname!",
              },
            ]}
          >
            <Input placeholder="Enter your name" size="large" />
          </Form.Item>

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
            label="Roll Number"
            name="rollNo"
            rules={[
              {
                required: true,
                message: "Please input your rollNo!",
              },
            ]}
          >
            <InputNumber style={{
              width: "100%",
            }} size="large" placeholder="e.g 134121" />
          </Form.Item>

          
          <Form.Item
            label="Batch Name"
            name="batch"
            rules={[
              {
                required: true,
                message: "Please input your batch name!",
              },
            ]}
          >
            <Input placeholder="Enter batch name" size="large" />
          </Form.Item>

          <Form.Item
            label="Erolled Course Name"
            name="course"
            rules={[
              {
                required: true,
                message: "Please input your enrolled course name!",
              },
            ]}
          >
            <Input placeholder="Enter enrolled course name" size="large" />
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
                Signup 
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};
export default StudentSignUp;

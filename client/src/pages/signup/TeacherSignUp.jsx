import React, { useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const TeacherSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("end");
  const formRef = useRef(null);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    axios
      .post("http://localhost:3000/api/v1/user/signup/teacher", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log(response.data);
        formRef.current.resetFields();
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
    <div className="flex justify-center items-center mt-12">
      <div>
        <div className="flex justify-center items-center">
          <div className="p-5">
            <img className="h-24 w-28" src="/SMIT_LOGO.png" alt="Smit Logo" />
            <span className="font-bold w-28 text-[16px]">
              SignUp Teacher
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
          ref={formRef}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
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
export default TeacherSignUp;

import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const TeacherSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("end");

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
    <Form
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
        label="FullName"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input your fullname!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
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
        <Input.Password />
      </Form.Item>

      {loading ? (
        <Button type="primary" loading iconPosition={position}>
          Loading
        </Button>
      ) : (
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
export default TeacherSignUp;

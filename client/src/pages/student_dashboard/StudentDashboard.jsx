import React from "react";
import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllAssignments from "./AllAssignments";
import Submissions from "./Submissions";
import StudentProfile from "./StudentProfile";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const StudentDashboard = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/student-dashboard");
      },
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "All Assignments",
      onClick: () => {
        navigate("/student-dashboard/all-assignments");
      },
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Submissions",
      onClick: () => {
        navigate("/student-dashboard/submissions");
      },
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/");
      },
    },
  ];

  const onClick = (e) => {
    console.log("selected", e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <h1 className="text-white font-bold p-5 text-[30px] text-center">
          Student
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content className="m-6">
          <div className="bg-white p-6 min-h-screen rounded-lg shadow-md">
            <Routes>
              <Route path="/" element={<StudentProfile />} />
              <Route path="/all-assignments" element={<AllAssignments />} />
              <Route path="/submissions" element={<Submissions />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default StudentDashboard;

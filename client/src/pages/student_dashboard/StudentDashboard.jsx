import React from "react";
import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Routes, Route } from "react-router-dom";
import AllAssignmentsPage from "./AllAssignmentsPage";

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
const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "All Assignments",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Submissions",
  },
  {
    key: "4",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

const onClick = (e) => {
  console.log("selected", e.key);
};

const StudentDashboard = () => {
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
              <Route path="/" element={<AllAssignmentsPage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default StudentDashboard;

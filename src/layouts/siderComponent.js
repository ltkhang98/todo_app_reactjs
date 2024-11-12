import React from "react";
import {
  ApiOutlined,
  DashboardOutlined,
  FieldTimeOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const SiderComponent = (props) => {
  const navigate = useNavigate();
  return (
    <Sider>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={[window.location.pathname]}
        items={[
          {
            key: "/",
            icon: <DashboardOutlined />,
            label: "Home",
          },
          {
            key: "/api",
            icon: <ApiOutlined />,
            label: "Restful API",
          },
          {
            key: "/listusers",
            icon: <UserOutlined />,
            label: "Danh sách users",
          },
          {
            key: "/todo",
            icon: <FieldTimeOutlined />,
            label: "Todo App",
          },
          {
            key: "/tictoctoe",
            icon: <PlayCircleOutlined />,
            label: "X/O",
          },
        ]}
      />
    </Sider>
  );
};

export default SiderComponent;

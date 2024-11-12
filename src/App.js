import React from "react";
import "./App.scss";
import NameList from "./listArray/NameList";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout, theme } from "antd";
import SiderComponent from "./layouts/siderComponent";
import TodoComponent from "./component/todo/todo";
import ApiHome from "./component/restful_api/apiHome";
const { Content } = Layout;

// Parent Component
function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <ToastContainer></ToastContainer>
      <SiderComponent></SiderComponent>
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              height: 950,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={"Home"}></Route>
              <Route path="/listusers" element={<NameList></NameList>}></Route>
              <Route
                path="/todo"
                element={<TodoComponent></TodoComponent>}
              ></Route>
              <Route path="/tictoctoe" element={"Game tictoctoe"}></Route>
              <Route path="/api" element={<ApiHome></ApiHome>}></Route>
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

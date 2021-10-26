import React from "react";
import "./App.css";
import { Layout } from "antd";
import MainContent from "./components/MainContent";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div style={{ color: "white" }}>Bright Money Bill Manager</div>
        </Header>
        <Content style={{ padding: "50px" }}>
          <div className="site-layout-content">
            <MainContent />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>by Shyam Bahety</Footer>
      </Layout>
    </div>
  );
}

export default App;

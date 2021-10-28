import "./App.css";
import { Layout } from "antd";
import Home from "./components/Home";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div style={{ color: "white", fontSize: 24 }}>
            Bright Money Bill Manager
          </div>
        </Header>
        <Content style={{ padding: "50px" }}>
          <div className="site-layout-content">
            <Home />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>by Shyam Bahety</Footer>
      </Layout>
    </div>
  );
}

export default App;

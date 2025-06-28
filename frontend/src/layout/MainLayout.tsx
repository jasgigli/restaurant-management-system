import { Outlet } from "react-router-dom";
import Header from "../components/layoutComponents/Header";
import Sidebar from "../components/layoutComponents/Sidebar";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, padding: 32, background: "#fff" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

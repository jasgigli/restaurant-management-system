import { AppBar } from "@/components/dashboard/AppBar";
import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AppBar />
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <Footer version="1.0.0" lastSync={new Date().toLocaleString()} />
      </div>
    </div>
  );
};

export default MainLayout;

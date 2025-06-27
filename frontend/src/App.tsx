import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Assets from "./pages/assets/Assets";
import Dashboard from "./pages/Dashboard";
import HR from "./pages/hr/HR";
import Login from "./pages/Login";
import Menu from "./pages/menu/Menu";
import POS from "./pages/sales/POS";
import Warehouse from "./pages/warehouse/Warehouse";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/hr/*" element={<HR />} />
          <Route path="/assets" element={<Assets />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

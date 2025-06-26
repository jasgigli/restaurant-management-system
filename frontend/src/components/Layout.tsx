import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const navLinks = [
  { to: "/", label: "Dashboard", roles: ["SuperAdmin", "Moderator"] },
  {
    to: "/warehouse",
    label: "Warehouse",
    roles: ["SuperAdmin", "KitchenStaff"],
  },
  { to: "/menu", label: "Menu", roles: ["SuperAdmin"] },
  { to: "/pos", label: "POS", roles: ["SuperAdmin", "Sales"] },
  { to: "/hr", label: "HR", roles: ["SuperAdmin", "HR"] },
  { to: "/assets", label: "Assets", roles: ["SuperAdmin"] },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, background: "#f5f5f5", padding: 24 }}>
        <h2>RMS</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navLinks
              .filter((link) => user && link.roles.includes(user.role))
              .map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      display: "block",
                      padding: "8px 0",
                      color: location.pathname === link.to ? "#007bff" : "#222",
                      fontWeight:
                        location.pathname === link.to ? "bold" : "normal",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <button onClick={logout} style={{ marginTop: 24 }}>
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: 32, background: "#fff" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

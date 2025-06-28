import { BarChart3, ChefHat, Settings, UserCheck, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const navLinks = [
  {
    to: "/admin",
    label: "Admin Dashboard",
    icon: <BarChart3 size={18} />,
    roles: ["admin"],
  },
  {
    to: "/hr-dashboard",
    label: "HR Dashboard",
    icon: <UserCheck size={18} />,
    roles: ["hr"],
  },
  {
    to: "/staff-dashboard",
    label: "Staff Dashboard",
    icon: <ChefHat size={18} />,
    roles: ["staff"],
  },
  {
    to: "/hr",
    label: "HR Management",
    icon: <Users size={18} />,
    roles: ["admin", "hr"],
  },
  {
    to: "/hr/staff",
    label: "Staff Management",
    icon: <Users size={18} />,
    roles: ["admin", "hr"],
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Settings size={18} />,
    roles: ["admin"],
  },
];

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="h-screen w-56 bg-white border-r flex flex-col p-4 shadow-sm">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">RMS</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks
            .filter((link) => user && link.roles.includes(user.role))
            .map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? "bg-blue-100 text-blue-700 font-semibold border border-blue-200"
                      : "hover:bg-gray-100 hover:text-gray-700 text-gray-600"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <div className="border-t pt-4">
        <div className="text-sm text-gray-500">
          <p>Logged in as:</p>
          <p className="font-medium text-gray-700">{user?.name || "User"}</p>
          <p className="text-xs text-gray-400 capitalize">
            {user?.role || "Unknown"}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

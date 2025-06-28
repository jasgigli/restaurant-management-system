import {
  Box,
  Home,
  Settings,
  ShoppingCart,
  Users,
  Utensils,
  Warehouse,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const navLinks = [
  {
    to: "/",
    label: "Dashboard",
    icon: <Home size={18} />,
    roles: ["SuperAdmin", "Moderator"],
  },
  {
    to: "/warehouse",
    label: "Warehouse",
    icon: <Warehouse size={18} />,
    roles: ["SuperAdmin", "KitchenStaff"],
  },
  {
    to: "/menu",
    label: "Menu",
    icon: <Utensils size={18} />,
    roles: ["SuperAdmin"],
  },
  {
    to: "/pos",
    label: "POS",
    icon: <ShoppingCart size={18} />,
    roles: ["SuperAdmin", "Sales"],
  },
  {
    to: "/hr",
    label: "HR",
    icon: <Users size={18} />,
    roles: ["SuperAdmin", "HR"],
  },
  {
    to: "/hr/staff",
    label: "Staff",
    icon: <Users size={18} />,
    roles: ["SuperAdmin", "HR"],
  },
  {
    to: "/assets",
    label: "Assets",
    icon: <Box size={18} />,
    roles: ["SuperAdmin"],
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Settings size={18} />,
    roles: ["SuperAdmin"],
  },
];

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <aside className="h-screen w-56 bg-muted border-r flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">RMS</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks
            .filter((link) => user && link.roles.includes(user.role))
            .map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

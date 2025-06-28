import { useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/warehouse": "Warehouse",
  "/menu": "Menu",
  "/pos": "Point of Sale",
  "/hr": "HR Management",
  "/assets": "Assets",
  "/settings": "Settings",
};

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const title = pageTitles[location.pathname] || "";

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <span>{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;

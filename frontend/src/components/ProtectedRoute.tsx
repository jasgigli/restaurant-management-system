import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

interface ProtectedRouteProps {
  roles?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute = ({ roles, fallback }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      )
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (roles && user && !roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleRoutes: Record<string, string> = {
      admin: "/admin",
      hr: "/hr-dashboard",
      staff: "/staff-dashboard",
    };

    const redirectPath = roleRoutes[user.role] || "/login";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

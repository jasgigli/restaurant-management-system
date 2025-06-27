import React, { useState } from "react";
// AuthLayout import removed for modern full-screen layout
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/FormField";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { post } from "../../services/api";

const ROLES = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
];

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await post("/auth/register", { name, email, password, role });
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      </div>
      <Card className="relative z-10 p-10 w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pinimg.com/736x/eb/4f/74/eb4f749fd1c95eefe5cccbcd325d8299.jpg"
            alt="Logo"
            className="w-20 h-20 mb-3 drop-shadow-lg"
          />
          <h2 className="text-4xl font-extrabold mb-1 text-primary tracking-tight">
            Create Account
          </h2>
          <p className="text-muted-foreground text-base">
            Register to get started
          </p>
        </div>
        {error && (
          <Alert variant="destructive" className="mb-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mb-5">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="bg-gray-50 focus:ring-2 focus:ring-primary/40 transition"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="bg-gray-50 focus:ring-2 focus:ring-primary/40 transition"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="bg-gray-50 focus:ring-2 focus:ring-primary/40 transition"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 text-left hover:bg-gray-100 transition"
                >
                  {ROLES.find((r) => r.value === role)?.label || "Select Role"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {ROLES.map((r) => (
                  <DropdownMenuItem
                    key={r.value}
                    onClick={() => setRole(r.value)}
                  >
                    {r.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            type="submit"
            className="w-full font-semibold text-lg py-3 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-150"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 inline-block" size={18} />
            ) : null}
            Register
          </Button>
        </form>
        <div className="mt-8 text-center text-base text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary font-medium underline hover:no-underline transition"
          >
            Login
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Register;

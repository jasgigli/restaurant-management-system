import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import { useAuth } from "../../providers/AuthProvider";
import { Card } from "../../components/ui/card";
import { FormField } from "../../components/FormField";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await post<{ id: number; name: string; email: string; role: string; token: string }, { email: string; password: string }>(
        '/auth/login',
        { email, password }
      );
      login(
        { id: data.id, name: data.name, email: data.email, role: data.role },
        data.token
      );
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
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
          <img src="https://i.pinimg.com/736x/eb/4f/74/eb4f749fd1c95eefe5cccbcd325d8299.jpg" alt="Logo" className="w-20 h-20 mb-3 drop-shadow-lg" />
          <h2 className="text-4xl font-extrabold mb-1 text-primary tracking-tight">Welcome Back!</h2>
          <p className="text-muted-foreground text-base">Sign in to your account</p>
        </div>
        {error && (
          <Alert variant="destructive" className="mb-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            className="bg-gray-50 focus:ring-2 focus:ring-primary/40 transition"
          />
          <div className="relative">
            <FormField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="bg-gray-50 pr-10 focus:ring-2 focus:ring-primary/40 transition"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-400 hover:text-primary transition"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit" className="w-full font-semibold text-lg py-3 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-150" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2 inline-block" size={18} /> : null}
            Login
          </Button>
        </form>
        <div className="mt-8 text-center text-base text-muted-foreground">
          Don't have an account?{' '}
          <a href="/register" className="text-primary font-medium underline hover:no-underline transition">Register</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;

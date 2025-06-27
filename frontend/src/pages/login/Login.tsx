import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AuthCard } from "../../components/ui/AuthCard";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/useToast";
import { useAuth } from "../../providers/AuthProvider";
import { post } from "../../services/api";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    setLoading(true);
    try {
      const res = await post<
        {
          id: number;
          name: string;
          email: string;
          role: string;
          token: string;
        },
        { email: string; password: string }
      >("/auth/login", { email: data.email, password: data.password });
      login(
        { id: res.id, name: res.name, email: res.email, role: res.role },
        res.token
      );
      toast("Login successful!", "success");
      navigate("/");
    } catch (err) {
      // @ts-expect-error: err is unknown, but may have response property
      setError(err.response?.data?.message || "Login failed");
      // @ts-expect-error: err is unknown, but may have response property
      toast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden animate-fade-in">
      {/* Glassy animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      </div>
      <AuthCard
        header={
          <div className="flex flex-col items-center gap-2 animate-fade-in-down">
            <Avatar
              src="https://i.pinimg.com/736x/eb/4f/74/eb4f749fd1c95eefe5cccbcd325d8299.jpg"
              alt="Logo"
              size="lg"
              fallback="RMS"
              className="mb-2 shadow-lg"
            />
            <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-1 font-display">
              Welcome Back!
            </h2>
            <p className="text-muted-foreground text-base font-medium">
              Sign in to your account
            </p>
            <Badge variant="info" className="mt-2">
              Restaurant Management System
            </Badge>
          </div>
        }
        footer={
          <div className="flex flex-col gap-2 items-center animate-fade-in-up">
            <div className="text-center text-base text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium underline hover:no-underline transition"
              >
                Register
              </Link>
            </div>
          </div>
        }
      >
        {error && (
          <Alert variant="destructive" className="mb-2 animate-fade-in">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 animate-fade-in-up"
          autoComplete="on"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
            >
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="username"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={
                  errors.email
                    ? "pr-10 border-red-500 focus:ring-red-400"
                    : "pr-10 focus:ring-primary/40"
                }
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
              />
              {errors.email && (
                <span
                  id="email-error"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 animate-fade-in"
                >
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className={
                  errors.password
                    ? "pr-10 border-red-500 focus:ring-red-400"
                    : "pr-10 focus:ring-primary/40"
                }
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <span
                  id="password-error"
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-red-500 animate-fade-in"
                >
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 animate-fade-in-up">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("remember")}
                className="accent-primary rounded transition-all focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Remember me
              </span>
            </label>
            <Link
              to="#"
              className="text-sm text-primary font-medium hover:underline transition"
              tabIndex={0}
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full font-semibold text-lg py-3 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-150"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 inline-block" size={18} />
            ) : null}
            Login
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;

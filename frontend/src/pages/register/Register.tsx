import { Loader2, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AuthCard } from "../../components/ui/AuthCard";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/Progress";
import { useToast } from "../../components/ui/useToast";
import { post } from "../../services/api";

const ROLES = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
];

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: { name: "", email: "", password: "", role: "staff" },
  });

  const password = watch("password");
  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await post("/auth/register", data);
      setSuccess("Registration successful! You can now log in.");
      toast("Registration successful!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // @ts-expect-error: err is unknown, but may have response property
      setError(err.response?.data?.message || "Registration failed");
      // @ts-expect-error: err is unknown, but may have response property
      toast(err.response?.data?.message || "Registration failed", "error");
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
              Create Account
            </h2>
            <p className="text-muted-foreground text-base font-medium">
              Register to get started
            </p>
            <Badge variant="info" className="mt-2">
              Restaurant Management System
            </Badge>
          </div>
        }
        footer={
          <div className="flex flex-col gap-2 items-center animate-fade-in-up">
            <div className="text-center text-base text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium underline hover:no-underline transition"
              >
                Login
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
        {success && (
          <Alert variant="success" className="mb-2 animate-fade-in">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form
          className="space-y-5 animate-fade-in-up"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="on"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...formRegister("name", { required: "Name is required" })}
              className={
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-primary/40"
              }
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              leftIcon={<User className="w-5 h-5 text-gray-400" />}
            />
            {errors.name && (
              <span
                id="name-error"
                className="text-xs text-red-500 animate-fade-in"
              >
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              {...formRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-primary/40"
              }
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
            />
            {errors.email && (
              <span
                id="email-error"
                className="text-xs text-red-500 animate-fade-in"
              >
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...formRegister("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className={
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-primary/40"
              }
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
            />
            <Progress
              value={passwordStrength * 25}
              max={100}
              color={
                passwordStrength === 1
                  ? "bg-red-400"
                  : passwordStrength === 2
                  ? "bg-yellow-400"
                  : passwordStrength === 3
                  ? "bg-blue-400"
                  : passwordStrength === 4
                  ? "bg-green-500"
                  : "bg-gray-200"
              }
              className="mt-2"
            />
            <div className="flex justify-between text-xs mt-1">
              <span
                className={
                  passwordStrength === 1
                    ? "text-red-500"
                    : passwordStrength === 2
                    ? "text-yellow-500"
                    : passwordStrength === 3
                    ? "text-blue-500"
                    : passwordStrength === 4
                    ? "text-green-600"
                    : "text-gray-400"
                }
              >
                {passwordStrength === 1
                  ? "Weak"
                  : passwordStrength === 2
                  ? "Fair"
                  : passwordStrength === 3
                  ? "Good"
                  : passwordStrength === 4
                  ? "Strong"
                  : ""}
              </span>
              <span className="text-gray-400">
                {password.length < 8
                  ? "At least 8 chars"
                  : passwordStrength < 4
                  ? "Add more variety"
                  : "Great password!"}
              </span>
            </div>
            {errors.password && (
              <span
                id="password-error"
                className="text-xs text-red-500 animate-fade-in"
              >
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Role
            </label>
            <div className="relative">
              <select
                id="role"
                {...formRegister("role", { required: true })}
                className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-700 dark:bg-background dark:text-gray-200 focus:ring-2 focus:ring-primary/40 transition appearance-none"
                aria-invalid={!!errors.role}
                aria-describedby="role-error"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </span>
            </div>
            {errors.role && (
              <span
                id="role-error"
                className="text-xs text-red-500 animate-fade-in"
              >
                {errors.role.message}
              </span>
            )}
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
      </AuthCard>
    </div>
  );
};

export default Register;

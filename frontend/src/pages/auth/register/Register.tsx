import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Lock,
  Mail,
  Shield,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { AuthCard } from "../../../components/ui/AuthCard";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Progress } from "../../../components/ui/Progress";
import { useToast } from "../../../components/ui/useToast";
import { authAPI } from "../../../services/api";

const ROLES = [
  { label: "Admin", value: "admin", description: "Full system access" },
  { label: "HR", value: "hr", description: "Human resources management" },
  { label: "Staff", value: "staff", description: "Basic operations" },
];

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special character"),
  role: z.enum(["admin", "hr", "staff"], { message: "Invalid role" }),
});

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
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", role: "staff" },
  });

  const password = watch("password");
  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authAPI.register(data);
      setSuccess("Registration successful! You can now log in.");
      toast("Registration successful!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || "Registration failed"
          : "Registration failed";
      setError(errorMessage);
      toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden py-8 sm:py-12">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/30 via-pink-500/20 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-400/30 via-blue-500/20 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Secondary floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-bounce delay-500" />

        {/* Geometric patterns */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-200/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-pink-200/20 rounded-full animate-spin-slow-reverse" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="hidden lg:block space-y-8 animate-fade-in-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    RMS Pro
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Restaurant Management System
                  </p>
                </div>
              </div>

              <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Join the Future of
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Restaurant Management
                </span>
              </h2>

              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Create your account and start managing your restaurant like a
                pro. Get access to powerful tools designed for modern
                restaurants.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Instant Setup
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get started in minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Shield className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Enterprise Security
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bank-level protection
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Team Management
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Collaborate effortlessly
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">S</span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-300 italic mb-2">
                    "RMS Pro transformed how we manage our restaurant. The
                    interface is intuitive and the features are exactly what we
                    needed."
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    Sarah Chen, Restaurant Owner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Register form */}
          <div className="animate-fade-in-right">
            <AuthCard
              header={
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative">
                    <Avatar
                      src="https://i.pinimg.com/736x/eb/4f/74/eb4f749fd1c95eefe5cccbcd325d8299.jpg"
                      alt="Logo"
                      size="lg"
                      fallback="RMS"
                      className="mb-2 shadow-xl ring-4 ring-white/20"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      Create Account
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Join thousands of restaurants using RMS Pro
                    </p>
                  </div>
                  <Badge variant="info" className="px-4 py-2 text-sm">
                    <Star className="w-4 h-4 mr-2" />
                    Restaurant Management System
                  </Badge>
                </div>
              }
              footer={
                <div className="flex flex-col gap-4 items-center">
                  <div className="text-center text-slate-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                  <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                    By creating an account, you agree to our Terms of Service
                    and Privacy Policy
                  </p>
                </div>
              }
              className="w-full max-w-md mx-auto"
            >
              {error && (
                <Alert
                  variant="destructive"
                  className="mb-6 animate-fade-in border-red-200 bg-red-50 dark:bg-red-900/20"
                >
                  <AlertTitle className="text-red-800 dark:text-red-200">
                    Registration Error
                  </AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-6 animate-fade-in border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-200">
                    Success!
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="on"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Full Name
                  </label>
                  <div className="relative group">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      {...formRegister("name")}
                      className={`pl-12 pr-4 py-3 text-base transition-all duration-200 ${
                        errors.name
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-slate-300 focus:ring-purple-400 focus:border-purple-400 group-hover:border-slate-400"
                      }`}
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    {errors.name && (
                      <span
                        id="name-error"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red-500 animate-fade-in"
                      >
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      {...formRegister("email")}
                      className={`pl-12 pr-4 py-3 text-base transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-slate-300 focus:ring-purple-400 focus:border-purple-400 group-hover:border-slate-400"
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    {errors.email && (
                      <span
                        id="email-error"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red-500 animate-fade-in"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      {...formRegister("password")}
                      className={`pl-12 pr-4 py-3 text-base transition-all duration-200 ${
                        errors.password
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-slate-300 focus:ring-purple-400 focus:border-purple-400 group-hover:border-slate-400"
                      }`}
                      aria-invalid={!!errors.password}
                      aria-describedby="password-error"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>

                  {/* Password strength indicator */}
                  <div className="space-y-2">
                    <Progress
                      value={passwordStrength * 25}
                      max={100}
                      className="h-2"
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
                    />
                    <div className="flex justify-between text-xs">
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
                          ? "At least 8 characters"
                          : passwordStrength < 4
                          ? "Add more variety"
                          : "Great password!"}
                      </span>
                    </div>
                  </div>

                  {errors.password && (
                    <span
                      id="password-error"
                      className="text-xs text-red-500 animate-fade-in flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Role
                  </label>
                  <div className="relative group">
                    <select
                      id="role"
                      {...formRegister("role")}
                      className="w-full pl-12 pr-10 py-3 text-base border rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 appearance-none group-hover:border-slate-400"
                      aria-invalid={!!errors.role}
                      aria-describedby="role-error"
                    >
                      {ROLES.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label} - {r.description}
                        </option>
                      ))}
                    </select>
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors pointer-events-none" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                      ▼
                    </span>
                  </div>
                  {errors.role && (
                    <span
                      id="role-error"
                      className="text-xs text-red-500 animate-fade-in flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.role.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-3 w-5 h-5" />
                  ) : (
                    <Star className="mr-3 w-5 h-5" />
                  )}
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </AuthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[^A-Za-z0-9]/, "At least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password");
  const passwordStrength = getPasswordStrength(password || "");

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Invalid reset link. Please request a new password reset.");
        setVerifying(false);
        return;
      }

      try {
        await authAPI.verifyResetToken(token);
        setVerifying(false);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Invalid or expired reset token";
        setError(errorMessage);
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authAPI.resetPassword({ token, password: data.password });
      setSuccess(
        "Password has been reset successfully! You can now log in with your new password."
      );
      toast("Password reset successful!", "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to reset password";
      setError(errorMessage);
      toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Verifying reset link...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden py-8 sm:py-12">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-green-400/30 via-emerald-500/20 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-teal-400/30 via-emerald-500/20 to-green-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Secondary floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-2xl animate-bounce delay-500" />

        {/* Geometric patterns */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-green-200/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-emerald-200/20 rounded-full animate-spin-slow-reverse" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="hidden lg:block space-y-8 animate-fade-in-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    RMS Pro
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Restaurant Management System
                  </p>
                </div>
              </div>

              <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Set Your New
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Password
                </span>
              </h2>

              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Create a strong, secure password to protect your account. Make
                sure it's something you'll remember but others can't guess.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Strong Security
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bank-level protection
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Instant Access
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get back to work immediately
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <Lock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Secure Storage
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Encrypted password storage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Reset Password form */}
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
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      New Password
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Create a strong password for your account
                    </p>
                  </div>
                  <Badge variant="info" className="px-4 py-2 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Secure Password Reset
                  </Badge>
                </div>
              }
              footer={
                <div className="flex flex-col gap-4 items-center">
                  <div className="text-center text-slate-600 dark:text-slate-400">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                  <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                    Your new password will be securely stored and encrypted
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
                    Reset Error
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
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                autoComplete="on"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    New Password
                  </label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      {...register("password")}
                      className={`pl-12 pr-12 py-3 text-base transition-all duration-200 ${
                        errors.password
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-slate-300 focus:ring-green-400 focus:border-green-400 group-hover:border-slate-400"
                      }`}
                      aria-invalid={!!errors.password}
                      aria-describedby="password-error"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
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
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                      className={`pl-12 pr-12 py-3 text-base transition-all duration-200 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-slate-300 focus:ring-green-400 focus:border-green-400 group-hover:border-slate-400"
                      }`}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby="confirm-password-error"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span
                      id="confirm-password-error"
                      className="text-xs text-red-500 animate-fade-in flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-3 w-5 h-5" />
                  ) : (
                    <Sparkles className="mr-3 w-5 h-5" />
                  )}
                  {loading ? "Resetting Password..." : "Reset Password"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </div>
              </form>
            </AuthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

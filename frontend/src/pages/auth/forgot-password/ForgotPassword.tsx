import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Mail,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
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
import { useToast } from "../../../components/ui/useToast";
import { authAPI } from "../../../services/api";

interface ForgotPasswordForm {
  email: string;
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authAPI.forgotPassword(data);
      setSuccess(
        "If an account with that email exists, a password reset link has been sent."
      );
      toast("Password reset email sent!", "success");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to send reset email";
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
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/30 via-purple-500/20 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Secondary floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl animate-bounce delay-500" />

        {/* Geometric patterns */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-200/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-200/20 rounded-full animate-spin-slow-reverse" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="hidden lg:block space-y-8 animate-fade-in-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    RMS Pro
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Restaurant Management System
                  </p>
                </div>
              </div>

              <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Forgot Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Password?
                </span>
              </h2>

              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                No worries! Enter your email address and we'll send you a secure
                link to reset your password and get back to managing your
                restaurant.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Quick Recovery
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get back in minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Secure Process
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bank-level security
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Email Delivery
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Instant email notification
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Forgot Password form */}
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
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      Reset Password
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Enter your email to receive reset instructions
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
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                  <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                    We'll send you a secure link to reset your password
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
                    Email Sent!
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
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      {...register("email")}
                      className={`pl-12 pr-4 py-3 text-base transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-slate-300 focus:ring-blue-400 focus:border-blue-400 group-hover:border-slate-400"
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
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

                <Button
                  type="submit"
                  className="w-full font-semibold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-3 w-5 h-5" />
                  ) : (
                    <Sparkles className="mr-3 w-5 h-5" />
                  )}
                  {loading ? "Sending Reset Link..." : "Send Reset Link"}
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

export default ForgotPassword;

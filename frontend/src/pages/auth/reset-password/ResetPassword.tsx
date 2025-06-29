import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Moon,
  Shield,
  Sun,
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
import { useTheme } from "../../../hooks/useTheme";
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
  const { setTheme, resolvedTheme } = useTheme();

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
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Invalid or expired reset token";
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
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to reset password";
      setError(errorMessage);
      toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-muted/30 dark:from-background dark:via-muted/10 dark:to-muted/20">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-foreground">
              Verifying Reset Link
            </p>
            <p className="text-muted-foreground">
              Please wait while we verify your password reset link...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-muted/30 dark:from-background dark:via-muted/10 dark:to-muted/20 relative overflow-hidden py-8 sm:py-12">
      {/* Theme toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm border border-border/20 hover:bg-background/90 transition-all duration-300"
      >
        {resolvedTheme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-accent/30 via-primary/20 to-accent/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Secondary floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-bounce delay-500" />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-40 right-40 w-1 h-1 bg-accent/60 rounded-full animate-float delay-1000" />
        <div className="absolute bottom-20 left-40 w-1.5 h-1.5 bg-primary/50 rounded-full animate-float delay-2000" />
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-accent/40 rounded-full animate-float delay-3000" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Hero content */}
          <div className="hidden lg:block space-y-10 animate-fade-in-left">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-2xl">
                    <Shield className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    RMS Pro
                  </h1>
                  <p className="text-muted-foreground font-medium">
                    Restaurant Management System
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-6xl font-bold text-foreground leading-tight">
                  Set Your New
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Password
                  </span>
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Create a strong, secure password to protect your account. Make
                  sure it's something you'll remember but others can't guess.
                </p>
              </div>
            </div>

            {/* Enhanced feature highlights */}
            <div className="grid grid-cols-1 gap-6">
              <div className="group flex items-center gap-6 p-6 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Strong Security
                  </h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade protection for your account
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-6 p-6 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/30 hover:border-accent/30 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Secure Reset
                  </h3>
                  <p className="text-muted-foreground">
                    Verified token process for maximum security
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-6 p-6 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    Password Strength
                  </h3>
                  <p className="text-muted-foreground">
                    Real-time validation and strength indicators
                  </p>
                </div>
              </div>
            </div>

            {/* Security tips */}
            <div className="p-8 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-3xl border border-border/30">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Security Tips
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Use a mix of uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Avoid common words and personal information
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Make it at least 8 characters long
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Reset Password form */}
          <div className="animate-fade-in-right">
            <AuthCard
              header={
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="relative">
                    <Avatar
                      src="https://i.pinimg.com/736x/eb/4f/74/eb4f749fd1c95eefe5cccbcd325d8299.jpg"
                      alt="Logo"
                      size="lg"
                      fallback="RMS"
                      className="mb-2 shadow-2xl ring-4 ring-background/20 w-20 h-20"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse flex items-center justify-center">
                      <Award className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-bold text-foreground">
                      New Password
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Create a strong password for your account
                    </p>
                  </div>
                  <Badge className="px-6 py-3 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                    <Shield className="w-5 h-5 mr-2" />
                    Secure Password Reset
                  </Badge>
                </div>
              }
              footer={
                <div className="flex flex-col gap-6 items-center">
                  <div className="text-center text-muted-foreground">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="text-primary font-semibold hover:text-primary/80 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <p className="text-xs text-muted-foreground text-center">
                    Your new password will be securely encrypted
                  </p>
                </div>
              }
              className="w-full max-w-lg mx-auto"
            >
              {error && (
                <Alert variant="destructive" className="mb-6 animate-fade-in">
                  <AlertTitle>Reset Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="mb-6 animate-fade-in">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form
                className="space-y-8"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="on"
              >
                <div className="space-y-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-foreground"
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
                      className={`pl-14 pr-14 py-4 text-base transition-all duration-300 rounded-xl ${
                        errors.password
                          ? "border-destructive focus:ring-destructive focus:border-destructive"
                          : "border-input focus:ring-primary focus:border-primary group-hover:border-border"
                      }`}
                      aria-invalid={!!errors.password}
                      aria-describedby="password-error"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-6 h-6" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {/* Enhanced password strength indicator */}
                  <div className="space-y-3">
                    <Progress
                      value={passwordStrength * 25}
                      max={100}
                      className="h-3 rounded-full"
                      color={
                        passwordStrength === 1
                          ? "bg-destructive"
                          : passwordStrength === 2
                          ? "bg-yellow-500"
                          : passwordStrength === 3
                          ? "bg-blue-500"
                          : passwordStrength === 4
                          ? "bg-green-500"
                          : "bg-muted"
                      }
                    />
                    <div className="flex justify-between text-sm">
                      <span
                        className={`font-medium ${
                          passwordStrength === 1
                            ? "text-destructive"
                            : passwordStrength === 2
                            ? "text-yellow-600"
                            : passwordStrength === 3
                            ? "text-blue-600"
                            : passwordStrength === 4
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
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
                      <span className="text-muted-foreground">
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
                      className="text-sm text-destructive animate-fade-in flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-foreground"
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
                      className={`pl-14 pr-14 py-4 text-base transition-all duration-300 rounded-xl ${
                        errors.confirmPassword
                          ? "border-destructive focus:ring-destructive focus:border-destructive"
                          : "border-input focus:ring-primary focus:border-primary group-hover:border-border"
                      }`}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby="confirmPassword-error"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-6 h-6" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span
                      id="confirmPassword-error"
                      className="text-sm text-destructive animate-fade-in flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold text-lg py-5 rounded-xl shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-3 w-6 h-6" />
                  ) : (
                    <>
                      <Shield className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Reset Password
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </AuthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

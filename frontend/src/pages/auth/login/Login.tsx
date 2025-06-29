import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Moon,
  Shield,
  Sparkles,
  Sun,
  TrendingUp,
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
import { Card, CardContent } from "../../../components/ui/card";
import { FormInput } from "../../../components/ui/form-input";
import { Stack } from "../../../components/ui/stack";
import { useToast } from "../../../components/ui/useToast";
import { useTheme } from "../../../hooks/useTheme";
import { useAuth } from "../../../providers/AuthProvider";
import { authAPI } from "../../../services/api";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "At least 6 characters"),
  remember: z.boolean().optional(),
});

const Login = () => {
  const { login } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();
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
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    setLoading(true);
    try {
      const res = await authAPI.login({
        email: data.email,
        password: data.password,
      });
      login(res.user, res.token);
      toast("Login successful!", "success");

      // Role-based redirection
      const role = res.user.role?.toLowerCase();
      let redirectPath = "/login";
      if (role === "admin") redirectPath = "/admin";
      else if (role === "hr") redirectPath = "/hr";
      else if (role === "staff") redirectPath = "/staff";
      else redirectPath = "/login";
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || "Login failed"
          : "Login failed";
      setError(errorMessage);
      toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

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
                    <Sparkles className="w-10 h-10 text-primary-foreground" />
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
                  Streamline Your
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Restaurant Operations
                  </span>
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Manage your restaurant efficiently with our comprehensive
                  suite of tools. From inventory to sales, everything you need
                  in one place.
                </p>
              </div>
            </div>

            {/* Enhanced feature highlights */}
            <Stack spacing="lg">
              <Card className="group bg-background/60 backdrop-blur-xl border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        Lightning Fast
                      </h3>
                      <p className="text-muted-foreground">
                        Quick and responsive interface for seamless operations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-background/60 backdrop-blur-xl border-border/30 hover:border-accent/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        Secure & Reliable
                      </h3>
                      <p className="text-muted-foreground">
                        Enterprise-grade security for your business data
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group bg-background/60 backdrop-blur-xl border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        Analytics & Insights
                      </h3>
                      <p className="text-muted-foreground">
                        Make data-driven decisions with real-time analytics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Stack>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-background/40 backdrop-blur-sm rounded-2xl border border-border/20">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div className="text-center p-4 bg-background/40 backdrop-blur-sm rounded-2xl border border-border/20">
                <div className="text-2xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center p-4 bg-background/40 backdrop-blur-sm rounded-2xl border border-border/20">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
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
                    <Badge className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                      Pro
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-bold text-foreground">
                      Welcome back
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Sign in to your account to continue
                    </p>
                  </div>
                </div>
              }
              footer={
                <div className="flex flex-col gap-6 items-center">
                  <div className="text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-primary font-semibold hover:text-primary/80 transition-colors underline decoration-2 underline-offset-2"
                    >
                      Sign up here
                    </Link>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <p className="text-xs text-muted-foreground text-center">
                    Secure login with enterprise-grade protection
                  </p>
                </div>
              }
              className="w-full max-w-lg mx-auto"
            >
              {error && (
                <Alert variant="destructive" className="mb-6 animate-fade-in">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Login Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  leftIcon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  className="py-4 text-base rounded-xl"
                  {...register("email")}
                />

                <FormInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  leftIcon={<Lock className="w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  }
                  error={errors.password?.message}
                  className="py-4 text-base rounded-xl"
                  {...register("password")}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      className="rounded border-border w-4 h-4 text-primary focus:ring-primary focus:ring-2 transition-all duration-200"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold text-lg py-5 rounded-xl shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-3 w-5 h-5" />
                      Sign In
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

export default Login;

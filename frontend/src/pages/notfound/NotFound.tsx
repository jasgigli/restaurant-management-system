import { AlertTriangle, ArrowLeft, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-red-400/30 via-orange-500/20 to-yellow-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-pink-400/30 via-red-500/20 to-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Secondary floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce delay-500" />

        {/* Geometric patterns */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-red-200/20 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-orange-200/20 rounded-full animate-spin-slow-reverse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Error number */}
          <h1 className="text-9xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>

          {/* Title */}
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. Don't
            worry, let's get you back on track.
          </p>

          {/* Search suggestion */}
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Looking for something specific?
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Try checking the URL for typos, or use the navigation menu to find
              what you need.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold border-2 border-slate-300 dark:border-slate-600 hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={() => navigate("/login")}
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Additional help */}
          <div className="mt-12 text-sm text-slate-500 dark:text-slate-500">
            <p>
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

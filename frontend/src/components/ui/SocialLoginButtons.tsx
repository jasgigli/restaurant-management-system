import * as React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./button";
import { cn } from "./utils";

interface SocialLoginButtonsProps {
  onGoogle?: () => void;
  onGitHub?: () => void;
  loadingProvider?: "google" | "github" | null;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogle,
  onGitHub,
  loadingProvider,
}) => (
  <div className="flex flex-col gap-3 animate-fade-in-up">
    <Button
      type="button"
      onClick={onGoogle}
      className={cn(
        "w-full flex items-center justify-center gap-2 bg-white border border-gray-200 shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-150 py-2 text-gray-800 font-semibold rounded-lg focus:ring-2 focus:ring-primary/40",
        loadingProvider === "google" && "opacity-60 pointer-events-none"
      )}
      aria-label="Sign in with Google"
    >
      <FcGoogle size={22} />
      Continue with Google
    </Button>
    <Button
      type="button"
      onClick={onGitHub}
      className={cn(
        "w-full flex items-center justify-center gap-2 bg-gray-900 text-white border border-gray-800 shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-150 py-2 font-semibold rounded-lg focus:ring-2 focus:ring-primary/40",
        loadingProvider === "github" && "opacity-60 pointer-events-none"
      )}
      aria-label="Sign in with GitHub"
    >
      <FaGithub size={20} />
      Continue with GitHub
    </Button>
  </div>
);
SocialLoginButtons.displayName = "SocialLoginButtons";

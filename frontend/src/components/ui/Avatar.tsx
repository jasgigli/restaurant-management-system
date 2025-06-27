import * as React from "react";
import { cn } from "./utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8 text-base",
  md: "w-14 h-14 text-xl",
  lg: "w-20 h-20 text-2xl",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = "md", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-white/60 backdrop-blur border border-gray-200 shadow-md overflow-hidden select-none",
        sizeMap[size],
        className
      )}
      aria-label={alt}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <span className="text-gray-700 font-semibold">{fallback}</span>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

/**
 * Shared Glassmorphism Background Component
 * Reusable animated background for Header and Footer components
 */

import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export interface GlassmorphismBackgroundProps {
  className?: string;
  children: React.ReactNode;
}

export const GlassmorphismBackground: React.FC<
  GlassmorphismBackgroundProps
> = ({ className, children }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

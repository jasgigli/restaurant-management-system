import React, { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    // Check localStorage first
    const stored = localStorage.getItem("theme") as "light" | "dark" | "system";
    if (stored && ["light", "dark", "system"].includes(stored)) {
      return stored;
    }
    // Fallback to system preference
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Apply theme to HTML element
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const updateTheme = () => {
        const isDark = mediaQuery.matches;
        setResolvedTheme(isDark ? "dark" : "light");
        root.classList.toggle("dark", isDark);
      };

      updateTheme();
      mediaQuery.addEventListener("change", updateTheme);

      return () => mediaQuery.removeEventListener("change", updateTheme);
    } else {
      setResolvedTheme(theme);
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

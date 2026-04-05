"use client";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")} 
      className={`relative flex items-center justify-center w-4 h-4 rounded-full overflow-hidden ${className}`}
      aria-label="Toggle theme"
    >
      <FaSun className="absolute h-4 w-4 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-4 w-4 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  );
}

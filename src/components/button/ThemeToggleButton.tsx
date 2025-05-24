"use client";

import { useTranslation } from "../../context/TranslationContext";
import { FaSun, FaMoon } from "../../utils/icons";
import { useState, useEffect } from "react";
import { ThemeToggleButtonProps } from "../../models/interfaces";

export default function ThemeToggleButton({ className = "" }: ThemeToggleButtonProps) {
  const { theme, changeTheme } = useTranslation();
  const [iconSize, setIconSize] = useState(20);

  // Update icon size based on screen width
  useEffect(() => {
    const updateIconSize = () => {
      if (window.innerWidth <= 480) {
        setIconSize(16);
      } else if (window.innerWidth <= 768) {
        setIconSize(18);
      } else {
        setIconSize(20);
      }
    };

    // Set initial size
    updateIconSize();

    // Update size on resize
    window.addEventListener("resize", updateIconSize);
    return () => window.removeEventListener("resize", updateIconSize);
  }, []);

  const toggleTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  // Responsive button styles
  const buttonStyle = {
    padding: window.innerWidth <= 480 ? "0.25rem" : "0.5rem",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "var(--foreground)",
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button
      onClick={toggleTheme}
      className={className}
      style={buttonStyle}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {theme === "dark" ? <FaMoon size={iconSize} /> : <FaSun size={iconSize} />}
    </button>
  );
}

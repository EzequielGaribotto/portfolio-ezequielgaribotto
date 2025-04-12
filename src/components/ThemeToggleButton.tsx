"use client";

import { useTranslation } from "../context/TranslationContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggleButton() {
  const { theme, changeTheme } = useTranslation();

  const toggleTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`headerbutton ${
        theme === "light"
          ? "bg-white text-black border-black"
          : "bg-black text-white border-white"
      }`}
    >
      {theme === "dark" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
}

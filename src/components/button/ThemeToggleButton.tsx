"use client";

import { useTranslation } from "../../context/TranslationContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeToggleButtonProps } from "../../models/interfaces";
import { THEME, ThemeType } from "../../constants";

export default function ThemeToggleButton({ className = "" }: ThemeToggleButtonProps) {
  const { t, theme, changeTheme } = useTranslation();
  const toggleTheme = () => {
    const newTheme: ThemeType = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    changeTheme(newTheme);
  };

  const buttonStyle = {
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
      className={`${className} p-2 max-[480px]:p-1 text-[20px] max-[768px]:text-[18px] max-[480px]:text-[16px]`}
      style={buttonStyle}
      aria-label={theme === THEME.LIGHT ? t("a11y.switchToDark") : t("a11y.switchToLight")}
    >
      {theme === THEME.DARK ? <FaMoon size="1em" /> : <FaSun size="1em" />}
    </button>
  );
}

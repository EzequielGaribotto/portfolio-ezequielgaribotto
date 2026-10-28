"use client";

import { useTranslation, useTheme } from "../../context/TranslationContext";
import { ThemeToggleButtonProps } from "../../models/interfaces";
import { THEME, ThemeType } from "../../constants";
import styles from "./ThemeToggleButton.module.css";

/** A switch whose thumb slides across while the sun turns into a moon. */
export default function ThemeToggleButton({ className = "" }: ThemeToggleButtonProps) {
  const { t } = useTranslation();
  const { theme, changeTheme } = useTheme();
  const dark = theme === THEME.DARK;

  const toggleTheme = () => {
    const newTheme: ThemeType = dark ? THEME.LIGHT : THEME.DARK;
    changeTheme(newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.track} ${className}`}
      data-mode={dark ? "dark" : "light"}
      aria-label={dark ? t("a11y.switchToLight") : t("a11y.switchToDark")}
    >
      <span className={styles.stars} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className={styles.thumb} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
          <defs>
            <mask id="theme-moon-mask">
              <rect width="24" height="24" fill="white" />
              <circle className={styles.cut} cx="15" cy="9" r="6.5" fill="black" />
            </mask>
          </defs>
          <g className={styles.rays} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 1.5v2.4M12 20.1v2.4M1.5 12h2.4M20.1 12h2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
          </g>
          <circle className={styles.core} cx="12" cy="12" r="5.2" fill="currentColor" mask="url(#theme-moon-mask)" />
        </svg>
      </span>
    </button>
  );
}

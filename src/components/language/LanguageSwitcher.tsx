"use client";

import { useTranslation } from "../../context/TranslationContext";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [fontSize, setFontSize] = useState("0.9rem");

  // Update font size based on screen width
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth <= 480) {
        setFontSize("0.7rem");
      } else if (window.innerWidth <= 768) {
        setFontSize("0.75rem");
      } else {
        setFontSize("0.9rem");
      }
    };

    // Set initial font size
    updateFontSize();

    // Update font size on resize
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    if (locale !== newLocale) {
      changeLocale(newLocale);
    }
  };

  // Style for the language switcher container
  const containerStyle = {
    display: "flex",
    gap: window.innerWidth <= 480 ? "4px" : "8px",
    alignItems: "center",
  };

  // Style for the language buttons
  const buttonStyle = (isActive: boolean) => ({
    fontSize: fontSize,
    fontWeight: isActive ? "600" : "400",
    opacity: isActive ? "1" : "0.7",
    padding: window.innerWidth <= 480 ? "2px 4px" : "4px 6px",
    background: "transparent",
    border: "none",
    cursor: isActive ? "default" : "pointer",
    color: "var(--foreground)",
  });

  return (
    <div style={containerStyle}>
      <button
        onClick={() => handleLocaleChange("en")}
        disabled={locale === "en"}
        style={buttonStyle(locale === "en")}
      >
        English
      </button>
      <span style={{ opacity: 0.5, fontSize }}>|</span>
      <button
        onClick={() => handleLocaleChange("es")}
        disabled={locale === "es"}
        style={buttonStyle(locale === "es")}
      >
        Español
      </button>
    </div>
  );
}
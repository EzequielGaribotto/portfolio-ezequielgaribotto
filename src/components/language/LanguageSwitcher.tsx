"use client";

import React from "react";
import { useTranslation } from "../../context/TranslationContext";

export default function LanguageSwitcher() {
  const { t, locale, changeLocale } = useTranslation();
  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en";
    changeLocale(newLocale);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative whitespace-nowrap text-[0.9rem] max-[768px]:text-[0.75rem] max-[480px]:text-[0.7rem] font-medium hover:opacity-80 transition-opacity after:absolute after:-inset-3 after:content-['']"
      aria-label={locale === "en" ? t("a11y.switchToSpanish") : t("a11y.switchToEnglish")}
    >
      {locale === "en" ? "EN | ES" : "ES | EN"}
    </button>
  );
}
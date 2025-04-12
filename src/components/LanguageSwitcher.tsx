"use client";

import { useTranslation } from "../context/TranslationContext";

export default function LanguageSwitcher() {
  const { locale, theme, changeLocale } = useTranslation();

  const handleLocaleChange = (newLocale: string) => {
    if (locale !== newLocale) {
      changeLocale(newLocale);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleLocaleChange("en")}
        disabled={locale === "en"}
        className={`headerbutton ${
          locale === "en"
            ? theme === "light"
              ? "bg-black text-white border-white selected"
              : "bg-white text-black border-black selected"
            : "opacity-50 unselected"
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleLocaleChange("es")}
        disabled={locale === "es"}
        className={`headerbutton ${
          locale === "es"
            ? theme === "light"
              ? "bg-black text-white border-white selected"
              : "bg-white text-black border-black selected"
            : "opacity-50 unselected"
        }`}
      >
        Español
      </button>
    </div>
  );
}
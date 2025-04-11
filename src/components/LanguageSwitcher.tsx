"use client";

import { useTranslation } from "../context/TranslationContext";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();

  const handleLocaleChange = (newLocale: string) => {
    if (locale !== newLocale) {
      changeLocale(newLocale);
      // No need to modify the URL
    }
  };

  return (
    <div className="flex justify-end p-4">
      <button
        onClick={() => handleLocaleChange("en")}
        disabled={locale === "en"}
        className={`mr-2 ${locale === "en" ? "font-bold" : ""}`}
      >
        English
      </button>
      <button
        onClick={() => handleLocaleChange("es")}
        disabled={locale === "es"}
        className={`${locale === "es" ? "font-bold" : ""}`}
      >
        Español
      </button>
    </div>
  );
}
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
      <div className="flex bg-gray-100 rounded-full p-2 shadow-md">
        <button
          onClick={() => handleLocaleChange("en")}
          disabled={locale === "en"}
          className={`mr-2 px-4 py-2 rounded-full ${
            locale === "en" ? "bg-gray-800 text-white font-bold" : "bg-gray-200 text-black"
          }`}
        >
          English
        </button>
        <button
          onClick={() => handleLocaleChange("es")}
          disabled={locale === "es"}
          className={`px-4 py-2 rounded-full ${
            locale === "es" ? "bg-gray-800 text-white font-bold" : "bg-gray-200 text-black"
          }`}
        >
          Español
        </button>
      </div>
    </div>
  );
}
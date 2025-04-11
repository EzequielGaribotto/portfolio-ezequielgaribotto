// filepath: c:\Dev\github\Portfolio_EzequielGaribotto\portfolio-ezequielgaribotto\src\context\TranslationContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "../app/translations";

const TranslationContext = createContext<any>(null);

export const TranslationProvider = ({
  children,
  initialLocale = "es",
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) => {
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || initialLocale;
    setLocale(savedLocale);
  }, [initialLocale]);

  if (!locale) {
    return null; // Prevent rendering until locale is determined
  }

  const t = (key: string) => {
    const keys = key.split(".");
    let value = translations[locale];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Missing translation for key: ${key}`);
        return key; // Return the key itself if translation is missing
      }
    }
    return typeof value === "string" ? value : key; // Ensure a string is returned
  };

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
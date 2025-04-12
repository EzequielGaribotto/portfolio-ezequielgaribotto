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
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || initialLocale;
    const savedTheme = localStorage.getItem("theme") || "light";
    setLocale(savedLocale);
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, [initialLocale]);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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
    <TranslationContext.Provider value={{ t, locale, changeLocale, theme, changeTheme }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
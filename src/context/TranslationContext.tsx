"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "../app/translations";

// Define proper interfaces for translation context
interface TranslationContextType {
  t: (key: string) => string;
  locale: string;
  changeLocale: (newLocale: string) => void;
  theme: string;
  changeTheme: (newTheme: string) => void;
  pageLoadTime: number | null;
}

// Define recursive type for translations
interface NestedTranslation {
  [key: string]: string | NestedTranslation | Record<string, unknown>[] | string[]; // Allow arrays of strings
}

type TranslationsType = {
  [locale: string]: NestedTranslation;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({
  children,
  initialLocale = "es",
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) => {
  const [locale, setLocale] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("light");
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || initialLocale;
    const savedTheme = localStorage.getItem("theme") || "light";
    setLocale(savedLocale);
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Measure page load time
    const loadTime = performance.now();
    setPageLoadTime(Math.round(loadTime));
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
    // Adjust type assertion to match the updated NestedTranslation type
    let value: NestedTranslation = (translations as TranslationsType)[locale];

    // Navigate through the nested properties
    for (const k of keys) {
      if (value === undefined || value === null) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }
      const nextValue = value[k];

      if (typeof nextValue === "string") {
        return nextValue;
      }

      if (nextValue && typeof nextValue === "object") {
        value = nextValue as NestedTranslation;
      } else {
        console.warn(`Invalid translation for key: ${key}`);
        return key;
      }
    }

    return key;
  };

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLocale, theme, changeTheme, pageLoadTime }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
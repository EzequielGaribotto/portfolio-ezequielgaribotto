"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "../app/translations";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS, LOCALE, THEME, ThemeType } from "../constants";

interface TranslationContextType {
  t: (key: string) => string;
  locale: string;
  changeLocale: (newLocale: string) => void;
  theme: ThemeType;
  changeTheme: (newTheme: ThemeType) => void;
  pageLoadTime: number | null;
}

interface NestedTranslation {
  [key: string]: string | NestedTranslation | Record<string, unknown>[] | string[];
}

type TranslationsType = {
  [locale: string]: NestedTranslation;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({
  children,
  initialLocale = LOCALE.ES,
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) => {
  const [locale, setLocale] = useLocalStorage(STORAGE_KEYS.LOCALE, initialLocale);
  const [theme, setTheme] = useLocalStorage<ThemeType>(STORAGE_KEYS.THEME, THEME.LIGHT);
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setPageLoadTime(Math.round(performance.now()));
  }, [theme]);

  // Apply theme transition class after initial load - increased delay for better initial rendering
  useEffect(() => {
    // Wait longer to ensure initial content is fully rendered before starting transitions
    const timer = setTimeout(() => {
      document.documentElement.classList.add('transition-theme');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const t = (key: string) => {
    try {
      const keys = key.split(".");
      let value: NestedTranslation = (translations as TranslationsType)[locale];

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
    } catch (error) {
      console.warn(`Error accessing translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLocale: setLocale, theme, changeTheme, pageLoadTime }}>
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
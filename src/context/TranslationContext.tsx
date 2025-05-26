"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "../app/translations"; // Updated import path

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
    try {
      const savedLocale = localStorage.getItem("locale") || initialLocale;
      const savedTheme = localStorage.getItem("theme") || "light";
      setLocale(savedLocale);
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      
      // Measure page load time
      const loadTime = performance.now();
      setPageLoadTime(Math.round(loadTime));
    } catch (error) {
      // Fallback if localStorage is not available
      console.warn('Failed to load saved preferences:', error);
      setLocale(initialLocale);
      setTheme("light");
    }
  }, [initialLocale]);

  // Apply theme transition class after initial load - increased delay for better initial rendering
  useEffect(() => {
    // Wait longer to ensure initial content is fully rendered before starting transitions
    const timer = setTimeout(() => {
      document.documentElement.classList.add('transition-theme');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const changeTheme = (newTheme: string) => {
    try {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  if (!locale) {
    return null; // Prevent rendering until locale is determined
  }

  const t = (key: string) => {
    try {
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
    } catch (error) {
      console.warn(`Error accessing translation for key: ${key}`, error);
      return key;
    }
  };

  const changeLocale = (newLocale: string) => {
    try {
      setLocale(newLocale);
      localStorage.setItem("locale", newLocale);
    } catch (error) {
      console.warn('Failed to save locale preference:', error);
      setLocale(newLocale);
    }
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
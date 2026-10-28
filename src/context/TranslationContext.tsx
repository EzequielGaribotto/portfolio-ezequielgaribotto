"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
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
  isHydrated: boolean;
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
  // Add a state to track hydration completion
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Always start with server-safe defaults to avoid hydration mismatch.
  // Client-side stored values are applied in useEffect below.
  const [locale, setLocale] = useLocalStorage(STORAGE_KEYS.LOCALE, initialLocale);
  const [theme, setTheme] = useLocalStorage<ThemeType>(STORAGE_KEYS.THEME, THEME.LIGHT);
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  // Mark hydration as complete after the initial render with a delay to ensure stability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Longer delay to ensure everything is stable
      const timer = setTimeout(() => {
        setIsHydrated(true);
        setPageLoadTime(Math.round(performance.now()));
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // First visit (nothing stored): the theme script in layout.tsx already resolved the OS preference.
  // Keep it instead of letting the "light" default overwrite it, then adopt it as the stored theme.
  const osTheme = useRef<string | undefined>(
    typeof document !== 'undefined' ? document.documentElement.dataset.theme : undefined
  );
  const followOsTheme = useRef(false);
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEYS.THEME) === null && osTheme.current === THEME.DARK) {
        followOsTheme.current = true;
        setTheme(THEME.DARK);
      }
    } catch {
      // Storage unavailable: the theme script's choice stays for this visit
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (followOsTheme.current) {
      if (theme !== THEME.DARK) return; // wait for the stored value to catch up
      followOsTheme.current = false;
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.add("theme-switching");
      root.setAttribute("data-theme", newTheme);
      window.setTimeout(() => root.classList.remove("theme-switching"), 300);
    }
  };

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', newLocale);
      document.documentElement.dataset.locale = newLocale;
    }
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
    <TranslationContext.Provider value={{ 
      t, 
      locale, 
      changeLocale, 
      theme, 
      changeTheme, 
      pageLoadTime, 
      isHydrated 
    }}>
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
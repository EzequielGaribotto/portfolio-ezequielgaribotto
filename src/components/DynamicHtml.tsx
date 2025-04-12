"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../context/TranslationContext";

export default function DynamicHtml({ children }: { children: React.ReactNode }) {
  const { locale, theme } = useTranslation();

  // Update the HTML attributes when locale or theme changes
  useEffect(() => {
    if (document && locale && theme) {
      document.documentElement.lang = locale;
      document.documentElement.dataset.theme = theme;
      document.querySelector('meta[name="color-scheme"]')?.setAttribute(
        'content', 
        theme === 'dark' ? 'dark' : 'light'
      );
    }
  }, [locale, theme]);

  // If locale or theme aren't determined yet, show a minimal loading state
  if (!locale || !theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Just return children once everything is ready
  return <>{children}</>;
}
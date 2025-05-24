"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../context/TranslationContext";

export default function DynamicHtml({ children }: { children: React.ReactNode }) {
  const { locale, theme } = useTranslation();

  // Update the HTML attributes when locale or theme changes
  useEffect(() => {
    if (document && locale && theme) {
      document.documentElement.lang = locale;

      // Add a short delay before applying the theme to ensure all CSS transitions work properly
      setTimeout(() => {
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="color-scheme"]')?.setAttribute(
          'content',
          theme === 'dark' ? 'dark' : 'light'
        );
      }, 5); // Very short delay to ensure CSS transitions register the change
    }
  }, [locale, theme]);

  // Just return children, we don't need a loading state as this component handles transitions
  return <>{children}</>;
}
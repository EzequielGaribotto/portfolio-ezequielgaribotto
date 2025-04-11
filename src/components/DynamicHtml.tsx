"use client";

import React from "react";
import { useTranslation } from "../context/TranslationContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function DynamicHtml({ children }: { children: React.ReactNode }) {
  const { locale } = useTranslation();

  if (!locale) {
    // Prevent rendering until the locale is determined
    return null;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <header>
          <LanguageSwitcher />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
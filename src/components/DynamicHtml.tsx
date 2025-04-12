"use client";

import React from "react";
import { useTranslation } from "../context/TranslationContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Footer from "./Footer";

export default function DynamicHtml({ children }: { children: React.ReactNode }) {
  const { locale, theme } = useTranslation();

  // Prevent rendering until both locale and theme are determined
  if (!locale || !theme) {
    // Return a minimal loading state with a spinner
    return (
      <html lang="en" data-theme="light" className="transition-none">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light dark" />
        </head>
        <body className="bg-background text-foreground">
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={locale} data-theme={theme} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme === 'dark' ? 'dark' : 'light'} />
        {/* Image optimization directives */}
        <style>{`
          img {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }
          img.loading {
            opacity: 0;
          }
          .image-container {
            background-color: var(--secondary);
            min-height: 200px;
          }
        `}</style>
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <header>
          <LanguageSwitcher />
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
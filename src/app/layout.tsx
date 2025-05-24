import "./globals.css";
import { TranslationProvider } from "../context/TranslationContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggleButton from "../components/button/ThemeToggleButton";
import Footer from "../components/section/footer/Footer";
import { Metadata } from 'next';
import translations from '../app/translations/translations';

// Generate metadata with translations
export function generateMetadata(): Metadata {
  // Use Spanish as default language for static metadata generation
  const locale = 'es';
  const meta = translations[locale].meta;
  
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLocale = "es"; // Default language

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className="antialiased">
        <TranslationProvider initialLocale={initialLocale}>
          <header className="flex justify-between items-center p-4">
            <LanguageSwitcher />
            <ThemeToggleButton />
          </header>
          <main>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
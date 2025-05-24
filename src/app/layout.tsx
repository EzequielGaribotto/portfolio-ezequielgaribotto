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
    manifest: '/images/logo/site.webmanifest',
    icons: {
      icon: [
        { url: '/images/logo/favicon.ico' },
        { url: '/images/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/images/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/images/logo/apple-touch-icon.png',
      other: [
        { url: '/images/logo/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/images/logo/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
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
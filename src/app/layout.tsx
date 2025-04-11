import "./globals.css";
import { TranslationProvider } from "../context/TranslationContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export const metadata = {
  title: "Portfolio de Ezequiel Garibotto - Desarrollador de Software",
  description: "Bienvenido a mi sitio web de portafolio!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLocale = "es"; // Default language

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className="antialiased">
        <TranslationProvider initialLocale={initialLocale}>
          <header>
            <LanguageSwitcher />
          </header>
          <main>{children}</main>
        </TranslationProvider>
      </body>
    </html>
  );
}
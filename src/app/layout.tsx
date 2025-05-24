import "./globals.css";
import { TranslationProvider } from "../context/TranslationContext";
import Header from "../components/header/Header";
import Footer from "../components/section/footer/Footer";
import { Metadata } from 'next';
import translations from '../app/translations'; // Updated import path

// Generate metadata with translations
export function generateMetadata(): Metadata {
  // Use Spanish as default language for static metadata generation
  const locale = 'es';
  const meta = translations[locale].meta;
  const root = '/images/logo'

  return {
    title: meta.title,
    description: meta.description,
    manifest: `${root}/site.webmanifest`,
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    icons: {
      icon: [
        { url: `${root}/favicon.ico` },
        { url: `${root}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
        { url: `${root}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      ],
      apple: `${root}/apple-touch-icon.png`,
      other: [
        { url: `${root}/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${root}/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
      ],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLocale = "es"; // Default language

  return (
    <html lang={initialLocale}>
      <head>
        {/* Preload script to prevent theme flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme) {
                    document.documentElement.dataset.theme = savedTheme;
                    document.querySelector('meta[name="color-scheme"]')?.setAttribute(
                      'content', 
                      savedTheme === 'dark' ? 'dark' : 'light'
                    );
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.dataset.theme = 'dark';
                    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', 'dark');
                  }
                } catch (e) {
                  console.error('Failed to apply theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <TranslationProvider initialLocale={initialLocale}>
          <Header />
          <main style={{ 
            paddingTop: "100px", /* Reduced from 120px for mobile */
            width: "100%"
          }}>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
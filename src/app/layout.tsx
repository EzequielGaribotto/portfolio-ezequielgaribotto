import "./globals.css";
import { TranslationProvider } from "../context/TranslationContext";
import Header from "../components/header/Header";
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
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
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
            paddingTop: "120px", /* Increased from 80px for mobile */
            maxWidth: "100vw",
            overflowX: "hidden"
          }}>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
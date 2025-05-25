import "./globals.css";
import { TranslationProvider } from "../context/TranslationContext";
import Header from "../components/header/Header";
import Footer from "../components/section/footer/Footer";
import { Metadata } from 'next';
import translations from '../app/translations';
import Script from 'next/script';

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
    // Add theme-color for Android navigation bar
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#f3f4f8' },
      { media: '(prefers-color-scheme: dark)', color: '#13151a' }
    ],
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
    // Add Content Security Policy as metadata
    other: {
      'Content-Security-Policy': 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: blob: https:; " +
        "font-src 'self'; " +
        "connect-src 'self'; " +
        "frame-src 'self' blob: data:; " +  // Added blob: and data: to allow PDF viewing
        "object-src 'self'; " +  // Changed from 'none' to 'self' to allow PDFs
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-ancestors 'self';"
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLocale = "es"; // Default language

  return (
    <html lang={initialLocale} suppressHydrationWarning={true}>
      <head>
        {/* Replace dangerouslySetInnerHTML with Next.js Script component */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
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
          `}
        </Script>
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <TranslationProvider initialLocale={initialLocale}>
          <Header />
          <main style={{ 
            paddingTop: "100px",
            width: "100%",
            flex: "1 0 auto" // Make main content take available space
          }}>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
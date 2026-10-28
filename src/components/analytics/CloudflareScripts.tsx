'use client';

import Script from 'next/script';

export default function CloudflareScripts() {
  // Use different configuration for dev vs production - with SSR safety
  const getBeaconConfig = () => {
    const baseConfig = {
      token: "e2f56442b3874b58b8a4d8355050dc2c",
      spa: true,
    };

    // Only add development-specific config on client side
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return {
        ...baseConfig,
        disableRUM: true
      };
    }

    return baseConfig;
  };

  return (
    <>
      {/* Cloudflare Web Analytics with environment-specific settings */}
      <Script 
        id="cloudflare-analytics"
        strategy="afterInteractive"
        src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon={JSON.stringify(getBeaconConfig())}
        onError={(e) => {
          // Silently handle script loading errors
          console.debug('Analytics script failed to load:', e);
        }}
      />
    </>
  );
}

// Add TypeScript declaration for Cloudflare beacon
declare global {
  interface Window {
    __cfBeacon?: unknown;
  }
}

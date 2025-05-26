'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function CloudflareScripts() {
  // Handle and suppress Cloudflare script errors
  useEffect(() => {
    // Create a function to intercept and handle 404 errors for Cloudflare scripts
    const originalFetch = window.fetch;
    window.fetch = async function(input, init) {
      // Convert input to string if it's a Request object
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      
      // Only intercept Cloudflare script requests
      if (url.includes('cloudflare') && url.includes('.js')) {
        try {
              return await originalFetch(input, init);
          } catch {
              return new Response('', {
                  status: 200,
                  headers: { 'Content-Type': 'application/javascript' }
              });
          }
      }
      
      // Pass through all other requests
      return originalFetch(input, init);
    };
    
    return () => {
      // Restore original fetch when component unmounts
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <>
      {/* Cloudflare Web Analytics - Direct token implementation */}
      <Script 
        id="cloudflare-analytics"
        strategy="afterInteractive"
        src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "e2f56442b3874b58b8a4d8355050dc2c", "spa": true}'
      />
    </>
  );
}

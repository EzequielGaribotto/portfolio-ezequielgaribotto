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
      
      // For development environment, handle CORS issues with Cloudflare endpoints
      if (window.location.hostname === 'localhost' && 
          (url.includes('cloudflare') || url.includes('/cdn-cgi/'))) {
        // In development, just silently "succeed" with empty response to avoid console errors
        return new Response('', {
          status: 200,
          headers: { 'Content-Type': 'application/javascript' }
        });
      }
      
      // In production, allow normal fetch but catch errors
      if ((url.includes('cloudflare') && url.includes('.js')) || 
          url.includes('/cdn-cgi/speculation')) {
        try {
          return await originalFetch(input, init);
        } catch {
          // Return empty response to avoid console errors
          return new Response('', {
            status: 200,
            headers: { 'Content-Type': 'application/javascript' }
          });
        }
      }
      
      // Pass through all other requests
      return originalFetch(input, init);
    };
    
    // For development only - Check if analytics is likely blocked
    if (process.env.NODE_ENV === 'development') {
      // Create a test element to detect if images from Cloudflare domains are blocked
      const testImg = document.createElement('img');
      testImg.style.display = 'none';
      testImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // 1x1 transparent gif
      testImg.setAttribute('data-cf-test', 'true');
      document.body.appendChild(testImg);
      
      setTimeout(() => {
        // Check if our Cloudflare analytics is likely blocked
        const cfScript = document.querySelector('script[src*="cloudflareinsights"]');
        const hasAdBlocker = !cfScript || typeof window.__cfBeacon === 'undefined';
        
        if (hasAdBlocker) {
          console.log('ℹ️ Analytics may be blocked by an ad blocker - this is normal and won\'t affect site functionality');
        } else {
          console.log('✅ Analytics working properly');
        }
        
        // Clean up test element
        if (testImg.parentNode) {
          document.body.removeChild(testImg);
        }
      }, 2000);
    }
    
    return () => {
      // Restore original fetch when component unmounts
      window.fetch = originalFetch;
    };
  }, []);

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

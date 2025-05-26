import { useEffect } from 'react';

export const useScrollRestoration = () => {
  useEffect(() => {
    // Check if we need to restore scroll position
    const scrollRestore = () => {
      const scrollY = sessionStorage.getItem('scrollPosition');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        // Clear the stored position to avoid issues with future navigation
        sessionStorage.removeItem('scrollPosition');
      }
    };

    // Save scroll position before page refresh
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    // Add event listeners
    window.addEventListener('beforeunload', saveScrollPosition);
    
    // Restore scroll position after page has loaded
    if (document.readyState === 'complete') {
      scrollRestore();
    } else {
      window.addEventListener('load', scrollRestore);
    }

    // Clean up
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('load', scrollRestore);
    };
  }, []);
};

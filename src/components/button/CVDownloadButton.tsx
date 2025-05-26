"use client";

import { useState, useRef, useEffect } from "react";
import { FaFileDownload, FaEye, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import { CVDownloadButtonProps } from "../../models/interfaces";

export default function CVDownloadButton({ className }: CVDownloadButtonProps) {
  const { t, theme, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewLang, setPreviewLang] = useState('es');
  const [supportsPdfViewer, setSupportsPdfViewer] = useState(true);
  const [showDateInfo, setShowDateInfo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [lastModifiedDates, setLastModifiedDates] = useState({
    es: null as Date | null,
    en: null as Date | null
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Updated fallback dates - these should be updated when you modify the CVs
  const fallbackDates = {
    es: new Date("2024-12-15T10:30:00Z"), // Update this when you modify the Spanish CV
    en: new Date("2024-12-15T10:30:00Z")  // Update this when you modify the English CV
  };
  
  // Format date to display in a more readable format
  const formatDate = (date: Date | string | null, includeTime: boolean = false) => {
    if (!date) return "Unknown";
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const localeString = locale === 'es' ? 'es-ES' : 'en-US';
    
    if (includeTime) {
      return dateObj.toLocaleDateString(localeString, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
      }) + ' ' + dateObj.toLocaleTimeString(localeString, {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    return dateObj.toLocaleDateString(localeString, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Enhanced fetch method that works in both development and production
  useEffect(() => {
    const fetchLastModifiedDate = async (url: string): Promise<Date | null> => {
      try {
        // First try to get the file metadata via HEAD request
        const response = await fetch(url, { 
          method: 'HEAD',
          cache: 'no-cache' // Ensure we get fresh metadata
        });
        
        if (response.ok) {
          const lastModified = response.headers.get('Last-Modified');
          if (lastModified) {
            const date = new Date(lastModified);
            // Validate the date - sometimes servers return invalid dates
            if (!isNaN(date.getTime()) && date.getFullYear() > 2020) {
              return date;
            }
          }
        }
        
        // Fallback: try to get file info via a different approach
        try {
          const fullResponse = await fetch(url, { 
            method: 'GET',
            cache: 'no-cache'
          });
          
          if (fullResponse.ok) {
            const lastModified = fullResponse.headers.get('Last-Modified');
            if (lastModified) {
              const date = new Date(lastModified);
              if (!isNaN(date.getTime()) && date.getFullYear() > 2020) {
                return date;
              }
            }
          }
        } catch (fallbackError) {
          console.warn(`Fallback fetch failed for ${url}:`, fallbackError);
        }
        
        return null;
      } catch (error) {
        console.warn(`Error fetching last modified date for ${url}:`, error);
        return null;
      }
    };

    const getModifiedDates = async () => {
      const [esDate, enDate] = await Promise.all([
        fetchLastModifiedDate('/cv/CV_ES_EzequielGaribotto.pdf'),
        fetchLastModifiedDate('/cv/CV_EN_EzequielGaribotto.pdf')
      ]);
      
      setLastModifiedDates({
        es: esDate || fallbackDates.es,
        en: enDate || fallbackDates.en
      });
    };

    getModifiedDates();
  }, []);

  // Handle opening and closing of dropdown
  useEffect(() => {
    let fadeTimeout: NodeJS.Timeout;
    
    if (isOpen) {
      setShowDateInfo(true);
      setFadeOut(false);
    } else if (showDateInfo) {
      // Start fade out animation
      setFadeOut(true);
      
      // Remove element after animation completes
      fadeTimeout = setTimeout(() => {
        setShowDateInfo(false);
      }, 1000); // 1 second matches the CSS transition duration
    }
    
    return () => {
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, [isOpen, showDateInfo]);

  // Check if browser supports PDF viewing
  useEffect(() => {
    // Simple detection based on user agent
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    // Most mobile browsers don't support inline PDF viewing well
    if (isMobile) {
      setSupportsPdfViewer(false);
    } else {
      // For desktop, try to detect PDF support
      // This is not perfect but gives a reasonable guess
      const isChrome = userAgent.indexOf('chrome') > -1;
      const isFirefox = userAgent.indexOf('firefox') > -1;
      const isSafari = userAgent.indexOf('safari') > -1 && !isChrome;
      
      // Chrome, Firefox and modern browsers generally support PDF
      setSupportsPdfViewer(isChrome || isFirefox || !isSafari);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key to close preview
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };
    
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when expanded
      // Hide header when CV preview is open
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
      
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
      // Show header when CV preview is closed
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      
    }
    
    return () => {
      document.body.style.overflow = '';
      // Ensure header is visible when component unmounts
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isPreviewOpen]);

  // Define styles that will be shared between button and dropdown
  const buttonTextColor = "var(--foreground)";
  const buttonBorderColor = "var(--foreground)";
  
  const buttonStyle = {
    color: buttonTextColor,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '2px solid',
    borderColor: buttonBorderColor,
    borderRadius: '9999px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    position: 'relative' as const, // Fix TypeScript error by explicitly typing
  };

  const buttonHoverStyle = {
    color: ('var(--primary)'),
    borderColor: ('var(--primary)'),
  };

  const dropdownStyle = {
    color: buttonTextColor,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Increased from 0.1 to 0.25
    backdropFilter: 'blur(15px)', // Increased from 5px to 15px
    WebkitBackdropFilter: 'blur(15px)', // Increased from 5px to 15px
    border: '2px solid',
    borderColor: buttonBorderColor,
    maxWidth: 'max-content',
    minWidth: 'fit-content',
    transform: 'translateX(-50%)',
    left: '50%',
  };

  const handlePreview = (lang: string) => {
    setPreviewLang(lang);
    setIsPreviewOpen(true);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Improved date display with better fallback */}
      {showDateInfo && (
        <div 
          className={`absolute text-center text-xs -top-6 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-80'}`}
          aria-hidden={fadeOut}
          style={{ 
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}
        >
          {t("cv.lastUpdated")}: {formatDate(lastModifiedDates.es || fallbackDates.es)}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-auto px-5 py-2.5 font-semibold rounded-full flex items-center justify-center shadow-sm hover:shadow-md"
        style={buttonStyle}
        onMouseOver={(e) => {
          Object.assign(e.currentTarget.style, buttonHoverStyle);
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = buttonTextColor;
          e.currentTarget.style.borderColor = buttonBorderColor;
        }}
      >
        <FaFileDownload className="mr-2" />
        {t("cv.download")}
      </button>
      
      {isOpen && (
        <div 
          className="absolute mt-2 top-full rounded-xl shadow-lg z-10 overflow-hidden whitespace-nowrap" 
          style={dropdownStyle}
        >
          <div className="flex flex-col w-full">
            {/* Spanish CV option */}
            <div className="group rounded-t-xl overflow-hidden">
              <div className={`flex items-center justify-center w-full ${
                theme === 'dark' 
                  ? 'group-hover:bg-gray-700 group-hover:bg-opacity-50' 
                  : 'group-hover:bg-gray-200 group-hover:bg-opacity-50'
              }`}>
                <a 
                  href="/cv/CV_ES_EzequielGaribotto.pdf" 
                  download
                  className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow text-center"
                  style={{ color: buttonTextColor }}
                  onClick={() => setIsOpen(false)}
                >
                  {t("cv.spanish")}
                </a>
                {supportsPdfViewer && (
                  <button 
                    onClick={() => handlePreview('es')}
                    className="px-3 py-3 text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                    aria-label={`${t("cv.preview")} ${t("cv.spanish")}`}
                  >
                    <FaEye size={20} className="transform hover:scale-110 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </div>
            
            <div style={{ borderTop: `1px solid ${buttonBorderColor}` }}></div>
            
            {/* English CV option */}
            <div className="group rounded-b-xl overflow-hidden">
              <div className={`flex items-center justify-center w-full ${
                theme === 'dark' 
                  ? 'group-hover:bg-gray-700 group-hover:bg-opacity-50' 
                  : 'group-hover:bg-gray-200 group-hover:bg-opacity-50'
              }`}>
                <a 
                  href="/cv/CV_EN_EzequielGaribotto.pdf" 
                  download
                  className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow text-center"
                  style={{ color: buttonTextColor }}
                  onClick={() => setIsOpen(false)}
                >
                  {t("cv.english")}
                </a>
                {supportsPdfViewer && (
                  <button 
                    onClick={() => handlePreview('en')}
                    className="px-3 py-3 text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                    aria-label={`${t("cv.preview")} ${t("cv.english")}`}
                  >
                    <FaEye size={20} className="transform hover:scale-110 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CV Preview Modal */}
      {isPreviewOpen && (
        <>
          {/* Fixed backdrop with blur effect */}
          <div 
            className="fixed inset-0 backdrop-blur-[10px] z-50 cursor-pointer"
            style={{
              backgroundColor: 'transparent',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            onClick={() => setIsPreviewOpen(false)}
          ></div>
          
          {/* Modal content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full max-w-4xl h-full max-h-[90vh] rounded-lg overflow-hidden flex flex-col pointer-events-auto shadow-2xl">
              <div className="flex items-center justify-between p-2 border-b-0 bg-[#3c3c3c] relative">
                {/* Left side - Date info with timestamp */}
                <div className="flex items-center text-white text-xs px-2 opacity-80 min-w-[180px] z-10">
                  <FaCalendarAlt className="mr-1" />
                  <span>
                    {formatDate(
                      previewLang === 'es' 
                        ? (lastModifiedDates.es || fallbackDates.es)
                        : (lastModifiedDates.en || fallbackDates.en),
                      true // Include time
                    )}
                  </span>
                </div>
                
                {/* Absolutely centered title */}
                <h3 className="font-medium text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                  {previewLang === 'es' ? t("cv.spanish") : t("cv.english")}
                </h3>
                
                {/* Right side - Close button */}
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-600 text-white min-w-[40px] z-10"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto bg-[#3c3c3c]">
                <object
                  data={previewLang === 'es' 
                    ? '/cv/CV_ES_EzequielGaribotto.pdf' 
                    : '/cv/CV_EN_EzequielGaribotto.pdf'}
                  type="application/pdf"
                  className="w-full h-full"
                  style={{ border: 'none', margin: 0, padding: 0 }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white">
                    <p className="mb-4">{t("cv.unableToDisplay")}</p>
                    <a 
                      href={previewLang === 'es' 
                        ? '/cv/CV_ES_EzequielGaribotto.pdf' 
                        : '/cv/CV_EN_EzequielGaribotto.pdf'} 
                      download
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
                    >
                      {t("cv.downloadInstead")}
                    </a>
                  </div>
                </object>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

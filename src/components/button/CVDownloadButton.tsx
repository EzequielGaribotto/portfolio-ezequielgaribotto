"use client";

import { useState, useRef, useEffect } from "react";
import { FaFileDownload, FaEye, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import { CVDownloadButtonProps } from "../../models/interfaces";
import { useCVMetadata } from "../../hooks/useCVMetadata";
import { formatDate } from "../../utils/dateHelpers";
import { detectPdfSupport } from "../../utils/browserHelpers";
import { CV_FILES } from "../../constants";

export default function CVDownloadButton({ className }: CVDownloadButtonProps) {
  const { t, theme, locale } = useTranslation();
  const { metadata } = useCVMetadata();
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewLang, setPreviewLang] = useState('es');
  const [supportsPdfViewer, setSupportsPdfViewer] = useState(true);
  const [showDateInfo, setShowDateInfo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSupportsPdfViewer(detectPdfSupport());
  }, []);

  const getCurrentDate = () => {
    if (!metadata) return new Date("2024-12-15T10:30:00Z");
    const dateString = metadata.lastUpdated[locale as keyof typeof metadata.lastUpdated] || metadata.lastUpdated.es;
    return new Date(dateString);
  };

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
  const buttonStyle = {
    color: "var(--foreground)",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '2px solid var(--foreground)',
    borderRadius: '9999px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    position: 'relative' as const, // Fix TypeScript error by explicitly typing
  };

  const buttonHoverStyle = {
    color: ('var(--primary)'),
    borderColor: ('var(--primary)'),
  };

  const dropdownStyle = {
    color: "var(--foreground)",
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Increased from 0.1 to 0.25
    backdropFilter: 'blur(15px)', // Increased from 5px to 15px
    WebkitBackdropFilter: 'blur(15px)', // Increased from 5px to 15px
    border: '2px solid var(--foreground)',
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
      {/* Date display without version */}
      {showDateInfo && metadata && (
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
          {t("cv.lastUpdated")}: {formatDate(getCurrentDate(), locale)}
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
          e.currentTarget.style.color = "var(--foreground)";
          e.currentTarget.style.borderColor = "var(--foreground)";
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
                  href={CV_FILES.ES}
                  download
                  className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow text-center"
                  style={{ color: "var(--foreground)" }}
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
            
            <div style={{ borderTop: `1px solid var(--foreground)` }}></div>
            
            {/* English CV option */}
            <div className="group rounded-b-xl overflow-hidden">
              <div className={`flex items-center justify-center w-full ${
                theme === 'dark' 
                  ? 'group-hover:bg-gray-700 group-hover:bg-opacity-50' 
                  : 'group-hover:bg-gray-200 group-hover:bg-opacity-50'
              }`}>
                <a 
                  href={CV_FILES.EN}
                  download
                  className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow text-center"
                  style={{ color: "var(--foreground)" }}
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
      {isPreviewOpen && metadata && (
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
                {/* Left side - Date info without version */}
                <div className="flex items-center text-white text-xs px-2 opacity-80 min-w-[200px] z-10">
                  <FaCalendarAlt className="mr-1" />
                  <span>
                    {formatDate(getCurrentDate(), locale, true)}
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
                  data={previewLang === 'es' ? CV_FILES.ES : CV_FILES.EN}
                  type="application/pdf"
                  className="w-full h-full"
                  style={{ border: 'none', margin: 0, padding: 0 }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white">
                    <p className="mb-4">{t("cv.unableToDisplay")}</p>
                    <a 
                      href={previewLang === 'es' ? CV_FILES.ES : CV_FILES.EN}
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

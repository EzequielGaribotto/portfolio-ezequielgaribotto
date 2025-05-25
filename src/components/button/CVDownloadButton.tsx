"use client";

import { useState, useRef, useEffect } from "react";
import { FaFileDownload, FaEye, FaTimes } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import { CVDownloadButtonProps } from "../../models/interfaces";

export default function CVDownloadButton({ className }: CVDownloadButtonProps) {
  const { t, theme } = useTranslation();  // Added theme from useTranslation
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewLang, setPreviewLang] = useState('es');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight transparency
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)', // For Safari
    border: '2px solid',
    borderColor: buttonBorderColor,
    borderRadius: '9999px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  };

  const buttonHoverStyle = {
    color: ('var(--primary)'),
    borderColor: ('var(--primary)'),
  };

  const dropdownStyle = {
    color: buttonTextColor,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight transparency
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)', // For Safari
    border: '2px solid',
    borderColor: buttonBorderColor,
    maxWidth: 'max-content', // Only as wide as needed
    minWidth: 'fit-content', // Ensure minimum width
  };

  const handlePreview = (lang: string) => {
    setPreviewLang(lang);
    setIsPreviewOpen(true);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
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
          className="absolute mt-2 left-1/2 -translate-x-1/2 top-full rounded-xl shadow-lg z-10 overflow-hidden whitespace-nowrap" 
          style={dropdownStyle}
        >
          <div className="flex flex-col w-full">
            {/* Spanish CV option */}
            <div className="group rounded-t-xl overflow-hidden">
              <div className={`flex items-center justify-between w-full ${
                theme === 'dark' 
                  ? 'group-hover:bg-gray-700 group-hover:bg-opacity-50' 
                  : 'group-hover:bg-gray-200 group-hover:bg-opacity-50'
              }`}>
                <a 
                  href="/cv/CV_ES_EzequielGaribotto.pdf" 
                  download
                  className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow"
                  style={{ color: buttonTextColor }}
                  onClick={() => setIsOpen(false)}
                >
                  {t("cv.spanish")}
                </a>
                <button 
                  onClick={() => handlePreview('es')}
                  className="px-3 py-3 text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                  aria-label={`${t("cv.preview")} ${t("cv.spanish")}`}
                >
                  <FaEye size={20} className="transform hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
            
            <div style={{ borderTop: `1px solid ${buttonBorderColor}` }}></div>
            
            {/* English CV option */}
            <div className="group rounded-b-xl overflow-hidden">
              <div className={`flex items-center justify-between w-full ${
                theme === 'dark' 
                  ? 'group-hover:bg-gray-700 group-hover:bg-opacity-50' 
                  : 'group-hover:bg-gray-200 group-hover:bg-opacity-50'
              }`}>
                <a 
                  href="/cv/CV_EN_EzequielGaribotto.pdf" 
                  download
                  className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow"
                  style={{ color: buttonTextColor }}
                  onClick={() => setIsOpen(false)}
                >
                  {t("cv.english")}
                </a>
                <button 
                  onClick={() => handlePreview('en')}
                  className="px-3 py-3 text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                  aria-label={`${t("cv.preview")} ${t("cv.english")}`}
                >
                  <FaEye size={20} className="transform hover:scale-110 transition-transform duration-300" />
                </button>
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
              <div className="flex items-center justify-between p-2 border-b-0 bg-[#3c3c3c]">
                <h3 className="font-medium text-white">
                  {previewLang === 'es' ? t("cv.spanish") : t("cv.english")}
                </h3>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-600 text-white"
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

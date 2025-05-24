"use client";

import { useState, useRef, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";

interface CVDownloadButtonProps {
  className?: string;
}

export default function CVDownloadButton({ className }: CVDownloadButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-auto px-5 py-2.5 font-semibold rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
        style={buttonStyle}
      >
        <FaFileDownload className="mr-2" />
        {t("cv.download") || "Download CV"}
      </button>
      
      {isOpen && (
        <div 
          className="absolute mt-2 left-1/2 -translate-x-1/2 rounded-xl shadow-lg z-10 overflow-hidden whitespace-nowrap" 
          style={dropdownStyle}
        >
          <a 
            href="/cv/EzequielGaribotto_CV_ES.pdf" 
            download
            className="block px-4 py-3 text-sm text-center transition-colors duration-200 hover:opacity-80"
            style={{ color: buttonTextColor }}
            onClick={() => setIsOpen(false)}
          >
            {t("cv.spanish") || "Spanish CV"}
          </a>
          <div style={{ borderTop: `1px solid ${buttonBorderColor}` }}></div>
          <a 
            href="/cv/EzequielGaribotto_CV_EN.pdf" 
            download
            className="block px-4 py-3 text-sm text-center transition-colors duration-200 hover:opacity-80"
            style={{ color: buttonTextColor }}
            onClick={() => setIsOpen(false)}
          >
            {t("cv.english") || "English CV"}
          </a>
        </div>
      )}
    </div>
  );
}

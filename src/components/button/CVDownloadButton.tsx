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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-md flex items-center justify-center transform hover:scale-105 transition-transform"
      >
        <FaFileDownload className="mr-2" />
        {t("cv.download") || "Download CV"}
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 w-36 left-1/2 -translate-x-1/2 bg-white rounded-md shadow-lg z-10 overflow-hidden">
          <a 
            href="/cv/EzequielGaribotto_CV_ES.pdf" 
            download
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center"
            onClick={() => setIsOpen(false)}
          >
            {t("cv.spanish") || "Spanish CV"}
          </a>
          <a 
            href="/cv/EzequielGaribotto_CV_EN.pdf" 
            download
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center"
            onClick={() => setIsOpen(false)}
          >
            {t("cv.english") || "English CV"}
          </a>
        </div>
      )}
    </div>
  );
}

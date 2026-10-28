"use client";

import { useState, useRef, useEffect } from "react";
import { FaFileDownload, FaEye } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import { CVDownloadButtonProps } from "../../models/interfaces";
import { useCVMetadata } from "../../hooks/useCVMetadata";
import { formatDate } from "../../utils/dateHelpers";
import { detectPdfSupport } from "../../utils/browserHelpers";
import { CV_FILES } from "../../constants";
import PdfPreviewModal from "./PdfPreviewModal";

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

  const getCurrentDate = (cvKey?: string) => {
    if (!metadata) return new Date("2024-12-15T10:30:00Z");
    
    // Use specific CV key if provided, otherwise fall back to locale-based lookup
    const key = cvKey || (locale as keyof typeof metadata.lastUpdated);
    const dateString = metadata.lastUpdated[key as keyof typeof metadata.lastUpdated] || metadata.lastUpdated.es;
    return new Date(dateString);
  };

  const getMostRecentCV = () => {
    if (!metadata) return { date: new Date("2024-12-15T10:30:00Z"), label: '' };
    
    const cvDates = [
      { key: 'en_ats', date: new Date(metadata.lastUpdated.en_ats), label: t("cv.english_ats") },
      { key: 'es', date: new Date(metadata.lastUpdated.es), label: t("cv.spanish") },
      { key: 'en', date: new Date(metadata.lastUpdated.en), label: t("cv.english") }
    ];
    
    // Find the most recent CV
    const mostRecent = cvDates.reduce((latest, current) => 
      current.date > latest.date ? current : latest
    );
    
    return { date: mostRecent.date, label: mostRecent.label };
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

  const buttonStyle = {
    color: "var(--foreground)",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '2px solid var(--foreground)',
    borderRadius: '9999px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    position: 'relative' as const,
  };

  const buttonHoverStyle = {
    color: ('var(--primary)'),
    borderColor: ('var(--primary)'),
  };

  const dropdownStyle = {
    color: "var(--foreground)",
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
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

  const cvOptions = [
    {
      key: 'en_ats',
      label: t("cv.english_ats"),
      file: CV_FILES.EN_ATS,
      previewLang: 'en_ats'
    },
    // {
    //   key: 'es',
    //   label: t("cv.spanish"),
    //   file: CV_FILES.ES,
    //   previewLang: 'es'
    // },
    {
      key: 'en',
      label: t("cv.english"),
      file: CV_FILES.EN,
      previewLang: 'en'
    }
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Date display with most recent CV version */}
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
          {(() => {
            const mostRecent = getMostRecentCV();
            return `${formatDate(mostRecent.date, locale)} - ${mostRecent.label}`;
          })()}
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
            {cvOptions.map((option, index) => (
              <div key={option.key}>
                {/* CV option */}
                <div className={`group overflow-hidden ${
                  index === 0 ? 'rounded-t-xl' : 
                  index === cvOptions.length - 1 ? 'rounded-b-xl' : ''
                }`}>
                  <div className={`flex items-center justify-center w-full ${
                    theme === 'dark' 
                      ? 'group-hover:bg-gray-700 group-hover:bg-opacity-50' 
                      : 'group-hover:bg-gray-200 group-hover:bg-opacity-50'
                  }`}>
                    <a 
                      href={option.file}
                      download
                      className="block px-4 py-3 text-sm text-center hover:opacity-80 flex-grow"
                      style={{ color: "var(--foreground)" }}
                      onClick={() => setIsOpen(false)}
                    >
                      {option.label}
                    </a>
                    {supportsPdfViewer && (
                      <button 
                        onClick={() => handlePreview(option.previewLang)}
                        className="px-3 py-3 text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                        aria-label={`${t("cv.preview")} ${option.label}`}
                      >
                        <FaEye size={20} className="transform hover:scale-110 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Separator line - only show between items, not after the last one */}
                {index < cvOptions.length - 1 && (
                  <div style={{ borderTop: `1px solid var(--foreground)` }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* CV preview: same modal as the project PDFs */}
      {isPreviewOpen && metadata && (
        <PdfPreviewModal
          title={previewLang === 'es' ? t("cv.spanish") : previewLang === 'en_ats' ? t("cv.english_ats") : t("cv.english")}
          subtitle={formatDate(getCurrentDate(previewLang), locale)}
          file={previewLang === 'es' ? CV_FILES.ES : previewLang === 'en_ats' ? CV_FILES.EN_ATS : CV_FILES.EN}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}

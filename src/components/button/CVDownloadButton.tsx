"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { FaFileDownload, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import { CVDownloadButtonProps } from "../../models/interfaces";
import { useCVMetadata } from "../../hooks/useCVMetadata";
import { formatDate } from "../../utils/dateHelpers";
import { detectPdfSupport } from "../../utils/browserHelpers";
import { CV_FILES } from "../../constants";
import PdfPreviewModal from "./PdfPreviewModal";
import styles from "./CVDownloadButton.module.css";

export default function CVDownloadButton({ className, variant = "outline", compact = false }: CVDownloadButtonProps) {
  const { t, locale } = useTranslation();
  const { metadata } = useCVMetadata();
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewLang, setPreviewLang] = useState('es');
  const [supportsPdfViewer, setSupportsPdfViewer] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  // The newest of the three CV files
  const getMostRecentDate = () => {
    if (!metadata) return null;
    const dates = [metadata.lastUpdated.en_ats, metadata.lastUpdated.es, metadata.lastUpdated.en].map((value) => new Date(value));
    return dates.reduce((latest, current) => (current > latest ? current : latest));
  };

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


  // The menu is centred under the button; near a screen edge it slides back inside, with a small margin
  const menuRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!isOpen || !menu) return;
    menu.style.transform = "translateX(-50%)";
    const box = menu.getBoundingClientRect();
    const margin = 12;
    const shift = box.left < margin ? margin - box.left : box.right > window.innerWidth - margin ? window.innerWidth - margin - box.right : 0;
    if (shift) menu.style.transform = `translateX(calc(-50% + ${shift}px))`;
  }, [isOpen]);

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
      {/* One click downloads the recommended CV (English, 1 page, ATS); the arrow offers the other versions */}
      <div className={styles.split}>
        <a
          href={CV_FILES.EN_ATS}
          download
          className={`${styles.button} ${styles.main} ${variant === "primary" ? styles.primary : ""} ${compact ? styles.compact : ""}`}
          aria-label={t("cv.downloadAts")}
        >
          <FaFileDownload className="mr-2" aria-hidden="true" />
          {t("cv.download")}
        </a>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.button} ${styles.more} ${variant === "primary" ? styles.primary : ""} ${compact ? styles.compact : ""}`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label={t("cv.otherVersions")}
          title={t("cv.otherVersions")}
        >
          <FaChevronDown aria-hidden="true" className={`${styles.moreIcon} ${isOpen ? styles.moreIconOpen : ""}`} />
        </button>
      </div>
      
      {isOpen && (
        <div 
          ref={menuRef}
          className={`absolute mt-2 top-full rounded-xl z-10 overflow-hidden ${styles.menu}`}
        >
          <ul className={styles.items} role="menu">
            {cvOptions.map((option) => (
              <li key={option.key} className={styles.item} role="none">
                <a
                  href={option.file}
                  download
                  role="menuitem"
                  className={styles.itemLink}
                  onClick={() => setIsOpen(false)}
                >
                  {option.label}
                </a>
                {supportsPdfViewer && (
                  <button
                    type="button"
                    className={styles.preview}
                    onClick={() => handlePreview(option.previewLang)}
                    aria-label={`${t("cv.preview")} ${option.label}`}
                  >
                    {t("documents.preview")}
                  </button>
                )}
              </li>
            ))}
          </ul>
          {metadata && getMostRecentDate() && (
            <p className={styles.updated}>
              {t("cv.lastUpdated")}: {formatDate(getMostRecentDate() as Date, locale)}
            </p>
          )}
        </div>
      )}
      
      {/* CV preview: same modal as the project PDFs */}
      {isPreviewOpen && metadata && (
        <PdfPreviewModal
          title={previewLang === 'es' ? t("cv.spanish") : previewLang === 'en_ats' ? t("cv.english_ats") : t("cv.english")}
          subtitle={formatDate(getCurrentDate(previewLang), locale)}
          file={previewLang === 'es' ? CV_FILES.ES : previewLang === 'en_ats' ? CV_FILES.EN_ATS : CV_FILES.EN}
          returnFocusTo={triggerRef}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}

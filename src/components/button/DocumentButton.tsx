"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaFilePdf, FaEye, FaDownload, FaTimes } from "react-icons/fa";
import Tooltip from "../tooltip/Tooltip";
import { useTranslation } from "../../context/TranslationContext";
import { detectPdfSupport } from "../../utils/browserHelpers";
import styles from "./DocumentButton.module.css";

interface DocumentButtonProps {
  label: string;
  file: string;
  className?: string;
}

/** PDF icon button: hover shows the title (shared Tooltip); click offers preview or download. */
export default function DocumentButton({ label, file, className = "" }: DocumentButtonProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [supportsPdfViewer, setSupportsPdfViewer] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSupportsPdfViewer(detectPdfSupport());
  }, []);

  // Close the menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  // Escape closes the preview; the page behind does not scroll while it is open
  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [previewOpen]);

  const fileName = file.split("/").pop() || "document.pdf";

  return (
    <div className={styles.root} ref={rootRef}>
      <Tooltip text={label}>
        <button
          type="button"
          className={`p-2 rounded-full transition-all duration-400 ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((open) => !open);
          }}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={label}
        >
          <FaFilePdf size={20} className="text-white hover:text-primary transition-colors duration-400" />
        </button>
      </Tooltip>

      {menuOpen && (
        <div className={styles.menu} role="menu">
          {supportsPdfViewer ? (
            <button
              type="button"
              role="menuitem"
              className={styles.menuItem}
              onClick={() => {
                setMenuOpen(false);
                setPreviewOpen(true);
              }}
            >
              <FaEye /> {t("documents.preview")}
            </button>
          ) : (
            <a
              role="menuitem"
              className={styles.menuItem}
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <FaEye /> {t("documents.preview")}
            </a>
          )}
          <a
            role="menuitem"
            className={styles.menuItem}
            href={file}
            download={fileName}
            onClick={() => setMenuOpen(false)}
          >
            <FaDownload /> {t("documents.download")}
          </a>
        </div>
      )}

      {previewOpen &&
        createPortal(
          <div className={styles.backdrop} onClick={() => setPreviewOpen(false)}>
            <div
              className={styles.modal}
              role="dialog"
              aria-label={label}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>{label}</span>
                <div className={styles.modalActions}>
                  <a className={styles.modalButton} href={file} download={fileName}>
                    <FaDownload /> {t("documents.download")}
                  </a>
                  <button
                    type="button"
                    className={styles.modalButton}
                    onClick={() => setPreviewOpen(false)}
                    aria-label={t("documents.close")}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              <object data={file} type="application/pdf" className={styles.pdf}>
                <a href={file} download={fileName}>
                  {t("documents.download")}
                </a>
              </object>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

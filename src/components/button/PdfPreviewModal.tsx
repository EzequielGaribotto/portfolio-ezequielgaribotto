"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { FaCalendarAlt, FaDownload, FaTimes } from "react-icons/fa";
import { useTranslation } from "../../context/TranslationContext";
import { useDialogFocus } from "../../hooks/useDialogFocus";
import styles from "./PdfPreviewModal.module.css";

interface PdfPreviewModalProps {
  title: string;
  /** Small line next to the calendar icon, e.g. the last update date. */
  subtitle?: string;
  file: string;
  onClose: () => void;
  /** Where focus goes on close when the opener (a menu item) no longer exists. */
  returnFocusTo?: RefObject<HTMLElement | null>;
}

/** The one PDF preview used by the CV button and by the project documents. */
export default function PdfPreviewModal({ title, subtitle, file, onClose, returnFocusTo }: PdfPreviewModalProps) {
  const { t } = useTranslation();
  const fileName = file.split("/").pop() || "document.pdf";
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogFocus(true, dialogRef, returnFocusTo);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Escape closes the preview; the page behind does not scroll while it is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>
            {subtitle && (
              <>
                <FaCalendarAlt className={styles.calendar} /> {subtitle}
                {" · "}
              </>
            )}
            {title}
          </span>
          <div className={styles.modalActions}>
            <a className={styles.modalButton} href={file} download={fileName}>
              <FaDownload /> {t("documents.download")}
            </a>
            <button
              type="button"
              className={styles.modalButton}
              onClick={onClose}
              aria-label={t("documents.close")}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <object data={file} type="application/pdf" className={styles.pdf}>
          <div className={styles.fallback}>
            <p>{t("cv.unableToDisplay")}</p>
            <a className={styles.modalButton} href={file} download={fileName}>
              {t("cv.downloadInstead")}
            </a>
          </div>
        </object>
      </div>
    </div>,
    document.body
  );
}

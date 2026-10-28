"use client";

import { useEffect, useRef, useState } from "react";
import { FaFilePdf, FaEye, FaDownload } from "react-icons/fa";
import Tooltip from "../tooltip/Tooltip";
import PdfPreviewModal from "./PdfPreviewModal";
import { useTranslation } from "../../context/TranslationContext";
import { detectPdfSupport } from "../../utils/browserHelpers";
import styles from "./DocumentButton.module.css";

interface DocumentButtonProps {
  label: string;
  file: string;
  pages?: number;
  className?: string;
  /** Called with true/false while the pointer or focus is on the button. */
  onHoverChange?: (hovering: boolean) => void;
}

/** PDF icon button: hover shows the title (shared Tooltip); click offers preview or download. */
export default function DocumentButton({ label, file, pages, className = "", onHoverChange }: DocumentButtonProps) {
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

  const fileName = file.split("/").pop() || "document.pdf";

  return (
    <div
      className={styles.root}
      ref={rootRef}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={(e) => {
        if ((e.target as HTMLElement).matches(":focus-visible")) onHoverChange?.(true);
      }}
      onBlur={() => onHoverChange?.(false)}
    >
      <Tooltip text={label} position="bottom" forcePosition disabled={menuOpen} tooltipClassName={styles.docTooltip}>
        <button
          type="button"
          className={`p-2 rounded-full transition-all duration-400 ${className} ${styles.docButton}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((open) => !open);
          }}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={label}
        >
          <FaFilePdf size={15} className="text-white" />
          {pages ? (
            <span className={styles.pages}>{t("documents.pages").replace("{count}", String(pages))}</span>
          ) : null}
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
                onHoverChange?.(false);
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

      {previewOpen && <PdfPreviewModal title={label} file={file} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}

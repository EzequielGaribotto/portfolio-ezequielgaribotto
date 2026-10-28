"use client";

import { useTranslation } from "../context/TranslationContext";

/** First tab stop on the page: lets keyboard users jump past the header into the content. */
export default function SkipLink() {
  const { t } = useTranslation();

  const jump = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("main-content")?.focus();
  };

  return (
    <a href="#main-content" className="skip-link" onClick={jump}>
      {t("a11y.skipToContent")}
    </a>
  );
}

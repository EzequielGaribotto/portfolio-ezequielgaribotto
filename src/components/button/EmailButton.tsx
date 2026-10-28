"use client";

import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Tooltip from "../tooltip/Tooltip";
import { useTranslation } from "../../context/TranslationContext";
import { EmailButtonProps } from "../../models/interfaces";

export default function EmailButton({ email, className = "" }: EmailButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };
  
  return (
    <>
      <Tooltip
        text={t("tooltips.email")}
        alternateText={t("tooltips.emailCopied")}
        showAlternate={copied}
      >
        <button
          onClick={copyToClipboard}
          aria-label={t("tooltips.email")}
          className={`p-2 rounded-full transition-all duration-500 ease-in-out ${className}`}
        >
          <FaEnvelope size={20} color="white" />
        </button>
      </Tooltip>
      {/* Announces the copy for screen readers; the visible confirmation is the tooltip */}
      <span className="sr-only" role="status">
        {copied ? t("tooltips.emailCopied") : ""}
      </span>
    </>
  );
}

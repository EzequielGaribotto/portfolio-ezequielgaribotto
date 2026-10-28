"use client";

import React from "react";
import Tooltip from "../tooltip/Tooltip";
import { useTranslation } from "../../context/TranslationContext";
import { ClickableButtonProps } from "../../models/interfaces";

export default function ClickableButton({
  href,
  children,
  className = "",
  onClick,
  tooltipText,
  tooltipKey,
}: ClickableButtonProps) {
  const { t } = useTranslation(); // Add theme to extract current theme

  // Use translation key if provided, otherwise use direct text
  const tooltipDisplayText = tooltipKey ? t(tooltipKey) : tooltipText;

  const button = (
    <a
      href={href}
      aria-label={tooltipDisplayText}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-full transition-all duration-400 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );

  if (tooltipDisplayText) {
    return <Tooltip text={tooltipDisplayText}>{button}</Tooltip>;
  }

  return button;
}

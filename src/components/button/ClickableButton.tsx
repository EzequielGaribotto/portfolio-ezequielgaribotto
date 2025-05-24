"use client";

import React from "react";
import Tooltip from "../Tooltip";
import { useTranslation } from "../../context/TranslationContext";

interface ClickableButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  tooltipText?: string;
  tooltipKey?: string; // New prop for translation key
}

export default function ClickableButton({
  href,
  children,
  className = "",
  onClick,
  tooltipText,
  tooltipKey,
}: ClickableButtonProps) {
  const { t } = useTranslation();

  const button = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-full transition-all duration-500 ease-in-out ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );

  // Use translation key if provided, otherwise use direct text
  const tooltipDisplayText = tooltipKey ? t(tooltipKey) : tooltipText;

  if (tooltipDisplayText) {
    return <Tooltip text={tooltipDisplayText}>{button}</Tooltip>;
  }

  return button;
}
